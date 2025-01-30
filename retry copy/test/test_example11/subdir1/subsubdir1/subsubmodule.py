# Absolute Import from subdir3
from test.test_example11.subdir3 import test

# Invalid Relative Import (going too high in the directory)
from .. import functinoal  # This should fail due to incorrect relative path.

print("Subsubmodule imports")

