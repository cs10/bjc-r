.PHONY: site copy

PANDOC=pandoc --from markdown --to html --fail-if-warnings course.md --metadata title="mytitle" --metadata-file=config.json 
SOURCES=index.html course/ cur/ glossary/

# Copies the existing source files into the www/ folder subdirectories.
# The purpuse is merely to create the directory structure; all of the files
# will be overwritten by the "site" target.
copy:
	find ${SOURCES} -name "*.html" | xargs -I {} cp --parents {} www/bjc-r/

site: copy
	find ${SOURCES} -name "*.html" | xargs -I {} -n 1 ${PANDOC} --template {} -o www/bjc-r/{}
