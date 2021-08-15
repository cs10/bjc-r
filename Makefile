.PHONY: site copy

PANDOC=pandoc --from markdown --to html --fail-if-warnings course.md --metadata title="mytitle" --metadata-file=config.json 

# Copies the existing source files into the www/ folder subdirectories.
# The purpuse is merely to create the directory structure; all of the files
# will be overwritten by the "site" target.
copy:
	find course/ -name "*.html" | xargs -I {} cp --parents {} www
	find cur/ -name "*.html" | xargs -I {} cp --parents {} www

site: copy
	find course/ -name "*.html" | xargs -I {} -n 1 ${PANDOC} --template {} -o www/{}
	find cur/ -name "*.html" | xargs -I {} -n 1 ${PANDOC} --template {} -o www/{}
