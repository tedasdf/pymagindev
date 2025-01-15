"""General strategy for the ReAct Agent."""

import time

from typing import Any, Dict, Tuple

import tiktoken

from tiktoken.core import Encoding

from functional import (
    _is_halted,
    _prompt_agent,
    accumulate_metrics,
)
from agential.agents.react.output import ReActOutput, ReActStepOutput
from agential.agents.react.strategies.base import ReActBaseStrategy
from agential.core.llm import BaseLLM, Response
from agential.utils.parse import remove_newline


class ReActGeneralStrategy(ReActBaseStrategy):

    def generate(
        self,
        question: str,
        examples: str,
        prompt: str,
        additional_keys: Dict[str, str],
        reset: bool,
    ) -> ReActOutput:
        """Generate a ReAct output by iteratively thinking, acting, and observing.

        Args:
            question (str): The question being answered.
            examples (str): Examples provided for the task.
            prompt (str): The prompt used to generate the thought.
            additional_keys (Dict[str, str]): Additional key-value pairs to pass to the language model.
            reset (bool): Whether to reset the agent's state before generating.

        Returns:
            ReActOutput: The generated output, including the final answer, metrics, and step-by-step details.
        """
        start = time.time()

        if reset:
            self.reset()

        scratchpad = ""
        answer = ""
        finished = False
        idx = 1
        steps = []
        while not self.halting_condition(
            finished=finished,
            idx=idx,
            question=question,
            scratchpad=scratchpad,
            examples=examples,
            prompt=prompt,
            additional_keys=additional_keys,
        ):
            # Think.
            scratchpad, thought, thought_response = self.generate_thought(
                idx=idx,
                scratchpad=scratchpad,
                question=question,
                examples=examples,
                prompt=prompt,
                additional_keys=additional_keys,
            )

            # Act.
            scratchpad, action_type, query, action_response = self.generate_action(
                idx=idx,
                scratchpad=scratchpad,
                question=question,
                examples=examples,
                prompt=prompt,
                additional_keys=additional_keys,
            )

            # Observe.
            scratchpad, answer, obs, finished, external_tool_info = (
                self.generate_observation(
                    idx=idx, scratchpad=scratchpad, action_type=action_type, query=query
                )
            )

            steps.append(
                ReActStepOutput(
                    thought=thought,
                    action_type=action_type,
                    query=query,
                    observation=obs,
                    answer=answer,
                    external_tool_info=external_tool_info,
                    thought_response=thought_response,
                    action_response=action_response,
                )
            )

            idx += 1

        total_time = time.time() - start
        total_metrics = accumulate_metrics(steps)
        out = ReActOutput(
            answer=answer,
            total_prompt_tokens=total_metrics["total_prompt_tokens"],
            total_completion_tokens=total_metrics["total_completion_tokens"],
            total_tokens=total_metrics["total_tokens"],
            total_prompt_cost=total_metrics["total_prompt_cost"],
            total_completion_cost=total_metrics["total_completion_cost"],
            total_cost=total_metrics["total_cost"],
            total_prompt_time=total_metrics["total_prompt_time"],
            total_time=total_time if not self.testing else 0.5,
            additional_info=steps,
        )

        return out

    