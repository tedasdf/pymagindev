from pydantic import BaseModel
from typing import Dict, List, Optional, Tuple, Union




class CallModel(BaseModel):
    func_token: str
    # parent: Tuple[str, str]  # Parent type (file, function) and token (either file or class)
    inputs: List[str]
    
class VariableModel(BaseModel):
    token: List[str]
    points_to: List[Union[CallModel,str]] # points_to can be either a Call or a string


class LogicStatModel(BaseModel):
    cond_type: str
    condition: Optional[List[Union[CallModel, str]]] = []
    process: List[Union[CallModel, VariableModel, str]]  # Can contain Call, Variable, or str





class FunctionModel(BaseModel):
    token: str  # Name of the function
    parent: Tuple[str ,str]  # A tuple with (parent type, token)
    process: List[Union[CallModel, VariableModel, str]]  # A list of Call, Variable, or string
    inputs: List[str]

class ClassModel(BaseModel):
    token: str
    function_list: List[FunctionModel]  # A list of functions associated with the class
    attribute: List[str]




class FileModel(BaseModel):
    token: str
    path: str
    function_list: List[FunctionModel] = []  # Correct usage of Field
    class_list: Optional[List[ClassModel]] = []