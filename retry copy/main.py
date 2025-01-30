import argparse
import os
import sys
import httpx
import asyncio

from python import Python
from model import Call, File, LogicStatement, UserDefinedClass, Variable, UserDefinedFunc
from db.main1 import CallModel, FunctionModel, VariableModel
from utils import find_match
# from db.main import CallModel, FileModel, FunctionModel, VariableModel

UNKNOWN_FUNC = 'unknown_func'



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
        part for part in file_path.replace('.py', '').split('\\') if part and part != '..'
    )

    file_inst = File(token, file_path)
    print("=================================================================================================")
    print("FILE_TOKEN:")
    print(file_inst.token)
    [raw_source_path] = raw_source_paths
    file_inst.imported_list = language.make_import(import_trees, file_inst.file_path, raw_source_path)

    # NEXT PR implement nested functino
    for node_tree in node_trees:
        file_inst.add_func_list(language.make_function(node_tree, parent=file_inst))

    # ## NEW VERSION NEXT PR MAKE ROOT NODE FOR FILE GROUP
    file_inst.root_node, file_inst.constant_list = language.make_root_node(body_trees)

    ## the if statement is inflexible so NEXT PR need to figure out how to improve that 
    for subgroup_tree in subgroup_trees:
        file_inst.add_classes_list(language.make_class(subgroup_tree, parent=file_inst))

    print(file_inst.classes_list)
    print("=================================================================================================")
    return file_inst






def check_file_reference(instes , parent , global_symbol , local_symbol):
    
    inst_db = []

    for inst in  instes:

        if not isinstance(inst, Call):
            
            continue

        checking_token = inst.func
        parent_token = inst.parent_token
       

        # This is an if statemnt for self.something function
        if isinstance(parent, UserDefinedClass) and parent_token == 'self':
            # If it's a method call inside a class (via 'self')
            key = find_match(list(local_symbol.keys()),checking_token)
            if key:
                inst.func = local_symbol[key]
                inst_db.append(CallModel(
                    func_token=checking_token,
                    inputs=inst.taken_var
                ))
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
                if len(inst.taken_var) == 0:
                    inst_db.append(
                        "constant"
                    )
                else:
                    inst_db.append(
                        CallModel(
                            func_token=UNKNOWN_FUNC,
                            inputs=inst.taken_var
                        )
                    )
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
    return inst_db

# def check_process(processes, parent, local_symbol , global_symbol):
    
#     db_list = []
#     varaiable = {}

#     for pro in processes:
#         if isinstance(pro, Call):
#             print("CALL:")
#             print(pro)
#             for idx, i in enumerate(pro.taken_var):
#                 if isinstance(i, Call):
#                     print("CALL:")
#                     print(pro)
#                     call_inst = CallModel(
#                         func_token=i.func,
#                         inputs=i.taken_var
#                     )
#                     print(call_inst)
#                     var_name = f"input{idx}_{pro.func}{pro.line_number}"
#                     db_list.append(
#                         VariableModel(
#                             token=[var_name],
#                             points_to=[call_inst]
#                         )
#                     )
#                     pro.taken_var[idx] = var_name
#                     print(pro)
                
#             db_sub_list = check_file_reference([pro] , parent, global_symbol , local_symbol)

#         elif isinstance(pro, Variable):
#             # print("VARIABLE:")
#             print("Variable:", pro.token)
#             print(pro)
#             db_sub_list =check_file_reference(pro.points_to , parent, global_symbol , local_symbol)
#             db_inst = VariableModel(
#                 token=pro.token,
#                 points_to=db_sub_list
#             )
#             db_list.append(db_inst)
#         if isinstance(pro, LogicStatement):
#             # print(pro.condition_type)
#             check_process(pro.condition, parent, local_symbol , global_symbol )
#             check_process(pro.process, parent, local_symbol , global_symbol )
#             if pro.else_branch:
#                 check_process(pro.else_branch, parent, local_symbol , global_symbol )
#     print(db_list)
#     return

def sort_taken_var(insts):
    additional_proces_list = []
    taken_var = []
    for pnt in insts:
        if pnt == 'Constant':
            continue
        elif isinstance(pnt, tuple):
            taken_var.append('.'.join(pnt))
        else:
            taken_var.append(pnt)
    return taken_var

def sort_call_in_var(pointings,file_symbol_dict):
    call_db_list = []

    for pnt in pointings:
        if isinstance(pnt, Call):
            
            if find_match(list(file_symbol_dict.keys()),pnt.func):
                token = pnt.func
            else:
                token = UNKNOWN_FUNC
            taken_var = sort_taken_var(pnt.taken_var)
            call_db_list.append(
                CallModel(
                    func_token=token,
                    inputs=taken_var
                )
            )
    return call_db_list

def check_process(processes, file_symbol_dict):

    process_db_list = []

    for pro in processes:
    
        if isinstance(pro, Call):
            print("CALL:")
            print(pro)
    
        elif isinstance(pro, Variable):
            call_db_list = sort_call_in_var(pro.points_to,file_symbol_dict)
            
            process_db_list.append( 
                VariableModel(
                    token=pro.token,
                    points_to=call_db_list
                )
            )
        # if isinstance(pro, LogicStatement):
            # print(pro.condition_type)
            
            # print(pro.condition)
            # check_process(pro.process)
            # if pro.else_branch != None:
                # check_process(pro.else_branch)
    print(process_db_list)
    return process_db_list



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



    for _ , file_inst in file_group.items():
        file_symbol_dict = file_inst.symbols_dict()
        for import_inst in file_inst.imported_list:
            if type(import_inst) == dict:
                # print(import_inst)
                [key] = import_inst.keys()
                file_import = file_group[key]
                file_import_symbol_dict = file_import.symbols_dict(import_inst[key])
                file_symbol_dict = {**file_symbol_dict, **file_import_symbol_dict}

            func_instes = file_inst.func_list

            func_list = []
            for func_inst in func_instes:
                
                process_db_list = check_process(func_inst.process , file_symbol_dict)    
                func_list.append(
                    FunctionModel(
                        token=func_inst.token,
                        parent=file_inst.token,
                        process=process_db_list
                    )
                )






            classes_instes = file_inst.classes_list
            # in file symbol 


            for class_inst in classes_instes:
                class_symbol = class_inst.all_symbols_dict()
                for func in class_inst.functions:
                    check_process(func.process)



if __name__ == "__main__":
    main()
