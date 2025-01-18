# Absolute Import from subdir1
from test.test_example11.subdir1 import functional

# Relative Import from subdir2
from .subdir2 import testmodule

# Invalid Import (non-existent module)
from test.test_example11.nonexistent import some_module

# Cyclic Import (imagine functional.py imports test.py)
# from test.test_example10.subdir1.functional import some_function

print("Test imports")
