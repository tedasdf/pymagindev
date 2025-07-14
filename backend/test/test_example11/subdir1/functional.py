# Absolute Import from subdir2
from test.test_example11.subdir2 import testmodule

# Relative Import from sibling file in the same folder (subsubdir1)
from .subsubdir1 import subsubmodule

# Invalid Import (module doesn't exist)
from test.test_example11.subdir1.nonexistent_module import some_function

print("Functional imports")
