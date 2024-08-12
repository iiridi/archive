set shell := ["powershell.exe", "-c"]

justfile := justfile()
dir := justfile_directory()
poetry := 'C:\Users\jbassin\AppData\Roaming\Python\Scripts\poetry.exe'

# list recipes
list:
    just --list

# run poetry on embedding
poetry *args:
    {{poetry}} -C '{{dir}}\embedding' {{args}}

embed:
    @{{poetry}} -C '{{dir}}\embedding' run '{{dir}}\embedding\embedding\embed.py'
