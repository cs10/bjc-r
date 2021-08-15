.PHONY: site copy

PANDOC=pandoc --from markdown --to html --fail-if-warnings course.md --metadata title="title" --metadata-file=config.json 
SOURCES=index.html course/ cur/ glossary/ topic/
EXTRAS=img llab.js llab/img/ llab/css/ llab/fonts/ llab/html llab/lib llab/script llab/loader.js

# Copies the existing source files into the www/ folder subdirectories.
copy:
	find ${SOURCES} | xargs -I {} cp -r --parents {} www/bjc-r/
	cp -r --parents ${EXTRAS} www/bjc-r

# Processes each HTML file as a template. If any template markers are present
# in the file, they will be replaced with data from config.json.
site: copy
	find ${SOURCES} -name "*.html" | xargs -I {} -n 1 ${PANDOC} --template {} -o www/bjc-r/{}
