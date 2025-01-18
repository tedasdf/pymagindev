import argparse
import copy
import os
import sys
import ast
import httpx
import asyncio

from python import Python
from model import Call, File, LogicStatement, UserDefinedClass, Variable, UserDefinedFunc
from utils import find_match
# from db.main import CallModel, FileModel, FunctionModel, VariableModel


language = Python()

def find_index(lst, element):
    if element in lst:
        return lst.index(element)
    return None  # If the element is not found



async def run_post_file(payload):
    # Define the URL of the POST endpoint
    url = "http://127.0.0.1:8000/file"
    
    # Payload to match the FastAPI model

    async with httpx.AsyncClient() as client:
        # Pass source_path as a query parameter and file_group as JSON body
        response = await client.post(
            url, 
            params={"source_path": payload["source_path"]}, 
            json=payload["file_group"]
        )
        print("POST Response:", response.json())


def get_sources_and_language(raw_source_paths):
    """
    Given a list of files and directories, return just files.
    If we are not passed a language, determine it.
    Filter out files that are not of that language

    :param list[str] raw_source_paths: file or directory paths
    :param str|None language: Input language
    :rtype: (list, str)
    """

    individual_files = []
    for source in sorted(raw_source_paths):
        if os.path.isfile(source):
            individual_files.append((source, True))
            continue
        for root, _, files in os.walk(source):
            for f in files:
                individual_files.append((os.path.join(root, f), False))

    sources = set()
    for source, explicity_added in individual_files:
        if explicity_added or source.endswith('.py'):
            sources.add(source)

    if not sources:
        raise AssertionError("Could not find any source files given {raw_source_paths} "
                             "and language {language}.")

    sources = sorted(list(sources))
    return sources

def make_file_group(tree, file_path, raw_source_paths):
    """
    Given an AST for the entire file, generate a file group complete with
    subgroups, nodes, etc.

    :param tree ast:
    :param file_path str:

    :rtype: File
    """

    subgroup_trees, node_trees, body_trees, import_trees = language.separate_namespaces(tree)
    
    token = '.'.join(
        part for part in file_path.replace('.py', '').split('/') if part and part != '..'
    )

    file_inst = File(token, file_path)
    print("=================================================================================================")
    print("FILE_TOKEN:")
    print(file_inst.file_path)

    file_inst.imported_list = language.make_import(import_trees)

    print(file_inst.imported_list)
    for import_inst in file_inst.imported_list :
            if isinstance(import_inst, dict):
                check = import_inst.keys()
            else:
                check = [import_inst]
            for raw_source in raw_source_paths:
                for key in check:
                    print("the fucking source is raw",raw_source)
                    if language.is_module_in_repo(key,raw_source):
                        print(key)
                        print("IS IN REPO")
                        print(raw_source)
            



    # NEXT PR implement nested functino
    for node_tree in node_trees:
        file_inst.add_func_list(language.make_function(node_tree, parent=file_inst))

    # ## NEW VERSION NEXT PR MAKE ROOT NODE FOR FILE GROUP
    file_inst.root_node, file_inst.constant_list = language.make_root_node(body_trees)

    ## the if statement is inflexible so NEXT PR need to figure out how to improve that 
    for subgroup_tree in subgroup_trees:
        file_inst.add_classes_list(language.make_class(subgroup_tree, parent=file_inst))

    # print(file_inst.classes_list)
    print("=================================================================================================")
    return file_inst

UNKNOWN_FUNC = 'unknown_func'




def check_file_reference(instes , parent , global_symbol , local_symbol):
    
    for inst in  instes:
        print("FOR LOOPING INSTS")
        if not isinstance(inst, Call):
            continue
        checking_token = inst.func
        parent_token = inst.parent_token
        print(inst)
        print(checking_token)
        if isinstance(parent, UserDefinedClass) and parent_token == 'self':
            # If it's a method call inside a class (via 'self')
            key = find_match(list(local_symbol.keys()),checking_token)
            if key:
                inst.func = local_symbol[key]
            else:
                inst.func = UNKNOWN_FUNC
                print("Self and not in class need to check inherit")
        elif isinstance(parent, UserDefinedClass) and parent_token != 'self':
            # If it's a method call via an instance (like 'a.test()')
            # You need to get the class name of the instance `a` and combine it with the method name
            key = find_match(list(global_symbol.keys()),checking_token)
            if key:
                inst.func = global_symbol[key]
            else:
                inst.func = UNKNOWN_FUNC
                # highly likely so that it is not 
        elif parent_token != None:
            ### TODO
            # outside of class call function .parent_token need to reference to the other original or the actual initalise reference which i had yet figure out 
            checking_token = parent_token + checking_token
        else: # this is for pure function inside a file not in class 
            key = find_match(list(global_symbol.keys()),checking_token)
            if key:
                inst.func = global_symbol[key]
            else:
                inst.func = UNKNOWN_FUNC

            # if the function is a symbol wihtin the file , it will be referecne to the corresponding symbol
            # if the function is a symbol within the class, it will also be refenced 
            # if the function is a function from some other library:
                # if the function has no variable inpit , it is regarded as a constant 
                # ifthe function is a function with variable input  it is consider as f(variable 1, variable2, varaible3 , .....)


def check_process(processes, parent, local_symbol , global_symbol):
    for pro in processes:
        if isinstance(pro, Call):
            print("THIS IS CALL")
            check_file_reference([pro] , parent, global_symbol , local_symbol)
        elif isinstance(pro, Variable):
            print("THIS IS VARIABLE")
            check_file_reference(pro.points_to , parent, global_symbol , local_symbol)
        if isinstance(pro, LogicStatement):
            print(pro.condition_type)
            check_process(pro.condition, parent, local_symbol , global_symbol )
            check_process(pro.process, parent, local_symbol , global_symbol )
            if pro.else_branch:
                print()
                check_process(pro.else_branch, parent, local_symbol , global_symbol )

        print()

def main(sys_argv=None):
    """
    CLI interface. Sys_argv is a parameter for the sake of unittest coverage.
    :param sys_argv list:
    :rtype: None
    """
    parser = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument(
        'sources', metavar='sources', nargs='+',
        help='source code file/directory paths.')

    sys_argv = sys_argv or sys.argv[1:]
    args = parser.parse_args(sys_argv)

    raw_source_paths=args.sources

    if not isinstance(raw_source_paths, list):
        raw_source_paths = [raw_source_paths]

    sources = get_sources_and_language(raw_source_paths)


    # get tree 
    file_ast_trees = []
    for source in sources:
        try:
            file_ast_trees.append((source, language.get_tree(source)))
        except Exception as ex:
            raise ex

    file_group = {}
    for source, file_ast_tree in file_ast_trees:
        file_group[str(source)] = make_file_group(file_ast_tree, source,raw_source_paths)


    print('Start Function and file referencing')
    # only in class function referencing 
    for file_key , file_inst in file_group.items():
        print(file_key)
        classes_int = file_inst.classes_list
        # in file symbol 
        file_symbol_dict = file_inst.all_symbols_dict()
        print("IMPORT LIST ")
        print(file_inst.imported_list)
        # out of file import symbol

        for class_inst in classes_int:
            class_symbol = class_inst.all_symbols_dict()
            for func in class_inst.functions:
                check_process(func.process, class_inst,class_symbol , file_symbol_dict )

        

    ######################################################  
    # for file_key, file_symbol in file_group.items():
    #     file_symbol = file_symbol.all_symbols()
    #     for func in file_symbol.all_symbols():
    #         in_func_symbol = {}
    #         for process, _ in func.process:
    #             if isinstance(process, Call):
    #                 if process.parent_token 
    #             elif isinstance(process, Variable):
    #                 comparing_token = process.points_to.func
    ######################################################                


    # for file_key, file_symbol in file_group.items():
    #     # file_model = FileModel( token=file_symbol.token ,
    #     #                         path=file_key)
    #     for func in file_symbol.all_func():
    #         # function_model = FunctionModel( token=func.token,
    #         #                                 parent=file_model)
    #         # print(func.token)
    #         output= []
    #         for process in func.process:
    #             if isinstance(process, Call) and isinstance(process.func, UserDefinedFunc):
    #                     output.append(process)
    #             elif isinstance(process, Variable) and isinstance(process.points_to.func, (UserDefinedClass, UserDefinedFunc)):
    #                 output.append(process)
    #         # print()
    #         # print(output)
    #         # print()
    #         # print("==================================================")
    #         # print()
    #         # print()
    #         func.output = output


    # file_model = None
    # for file_key, file_symbol in file_group.items():
    #     file_model = FileModel( token=file_symbol.token,
    #                             path=file_key)
    #     for func in file_symbol.all_func():
    #         func_model = FunctionModel( token=file_symbol.token , parent=file_model)
    #         file_model.function_dict[func.token] = func_model
        
    # for file_key, file_symbol in file_group.items():
    #     for func in file_symbol.all_func():
    #         output_list = []
    #         for single_output in func.output:
    #             if type(single_output) == 'str':
    #                 output_list.append(single_output)
    #             elif isinstance(single_process, Call):
    #                 output_list.append(CallModel(file_model.function_dict[single_process.func.token]))
    #             elif isinstance(single_process, Variable):
    #                 if isinstance(single_process.points_to , UserDefinedFunc):
    #                     output_list.append(VariableModel(points_to=file_model.function_dict[single_process.points_to.func.token] , token= single_process.token))
   
   
   
    # parse into pydantic

    # file_model = FileModel(
    #     token="abc",
    #     path="/example/path",
    #     function_list={},  # No circular references here
    #     class_list={}      # No circular references here
    # )




    # print(file_model.model_dump())
    # payload = {
    #     "source_path": file_model.token,
    #     "file_group": file_model
    # }
    # asyncio.run(run_post_file(payload))

        # check the process of the func


    # send to fastapi 



if __name__ == "__main__":
    main()
