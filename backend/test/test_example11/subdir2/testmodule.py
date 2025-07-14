# Valid Relative Import from sibling directory (subsubdir2)
from .subsubdir2 import deepmodule

# Absolute Import from subdir1
from test.test_example11.subdir1 import functional

# Invalid Import from nonexistent module
from test.test_example11.subdir2.nonexistent import another_module

print("Testmodule imports")
