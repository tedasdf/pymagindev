def generate_observation(
        self, idx: int, scratchpad: str, action_type: str, query: str
    ) -> Tuple[str, str, str, bool, Dict[str, Any]]:
    """Generates an observation based on the provided action type and query.

    Args:
        idx (int): The index of the current observation.
        scratchpad (str): The current state of the scratchpad.
        action_type (str): The type of action performed (e.g. "search", "lookup", "finish").
        query (str): The query for the action.

    Returns:
        Tuple[str, str, str, bool, Dict[str, Any]]: The updated scratchpad, the answer, the observation, a flag indicating if the task is finished, and a dictionary containing external tool information.
    """
    answer = ""
    finished = False
    external_tool_info = {"search_result": "", "lookup_result": ""}

    scratchpad += f"\nObservation {idx}: "
    if action_type.lower() == "finish":
        answer = query
        finished = True
        obs = query
    elif action_type.lower() == "search":
        try:
            search_result = self.docstore.search(query)
            external_tool_info["search_result"] = search_result
            obs = remove_newline(search_result)
        except Exception:
            obs = "Could not find that page, please try again."
    elif action_type.lower() == "lookup":
        try:
            lookup_result = self.docstore.lookup(query)
            external_tool_info["lookup_result"] = lookup_result
            obs = remove_newline(lookup_result)

        except ValueError:
            obs = "The last page Searched was not found, so you cannot Lookup a keyword in it. Please try one of the similar pages given."
    else:
        obs = "Invalid Action. Valid Actions are Lookup[<topic>] Search[<topic>] and Finish[<answer>]."
    scratchpad += obs

    return scratchpad, answer, obs, finished, external_tool_info