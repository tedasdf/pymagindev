from typing import Dict
from fastapi import FastAPI
from db.main1 import FileModel, FunctionModel , CallModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from main import pymag
# Create FastAPI app
app = FastAPI()

files_group: Dict[str, FileModel] = {}

# @app.post("/file")
# async def post_file(source_path: str, file_group: FileModel):
#     # Save file metadata
#     files_group[source_path] = file_group.dict()
#     return {
#         "file path": source_path,
#         "pydantic basemodel": file_group.dict()
#     }

# @app.post("/function")
# async def post_function(source_path:str , func_group: FunctionModel):
#     func_group[source_path] = func_group.dict()
#     return {
#         "file path": source_path,
#         "pydantic basemodel": func_group.dict()
#     }
# Allow all origins (or specify a list of origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, replace with specific URLs if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.post('/file/{file_token}/{function_name}')
async def upload_file_path(file_token, function_name):
    files = files_group[file_token]
    function_inst = None
    for i in files.function_list:
        if function_name == i.token:
            function_inst = i

    return function_inst

@app.post('/file/{file_path}')
async def upload_file_path(file_path):
    files = pymag(file_path)
    files_group[files.token] = files
    return files_group

# Example endpoint that accepts the FileModel
@app.post("/file")
async def upload_file(file: FileModel):
    # For now, just return the received file data
    files_group[file.token] = file
    return files_group

@app.get("/file/{token}")
async def get_file(token: str):
    if token in files_group:
        return {"file": files_group[token]}
    return {"error": "File not found"}

@app.get('/file_key')
async def get_file_keys():
    return {"filekeys":files_group.keys()}

# @app.get("/file")
# async def get_file(source_path: str):
#     # Return specific file metadata
#     return {"uploaded_files": files_group.get(source_path)}

# @app.get("/file/get_all_files")
# async def get_all_files():
#     # Return all stored metadata
#     return files_group




# @app.get('/nodes')
# async def get_all_nodes():
#     # Return all the nodes in the dictionary
#     return node_dict

# @app.post('/node')
# async def post_node(id, node):
#     node_dict[id] = node
#     return "succes"