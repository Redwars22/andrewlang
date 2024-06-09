# 🔢 VARIABLES AND CONSTANTS

`let` defines a variable, a value that might be changed later. i.e.: `let name = "Andrew"` or `let name:str = "Andrew"`. `const` defines a constant value. i.e.: `const name = "Andrew"` or `const name:str = "Andrew"`.

If you don’t define a specific type, it will be automatically inferred and assigned. However, you might not be able to reassign a value of a different type later on elsewhere. If you do so, the compiler will throw a `ERR_ASSIGN_VAL_OF_UNMATCHING_TYPE` error. This is to ensure safety and reduce the likelihood of runtime errors.