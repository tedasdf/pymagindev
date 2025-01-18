# Valid Absolute Import from subdir2
from test.test_example11.subdir2 import testmodule

# Invalid Import (module doesn't exist in the repo)
from test.test_example11.subdir2.nonexistent import missing_module

print("Utils imports")
