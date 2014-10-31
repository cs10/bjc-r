# bjc-r

The Beauty and Joy of Computing labs resource repository.

## Cloning this Repo
We use a project called "llab" to be able to display the lab content nicely. It's contained in the "submodule" `llab` which somewhat changes the way you need to work with `git`.

(As an aside, if you're interested, you should definitely [check out llab][llab].)

`git clone --recoursive`

OR
```
git submoduke init
git submodule update
```

To update the repo you should do this:
```
git pull
git submodule update
```

## Viewing the Site
The main "production" server for labs is hosted at Berkeley, [here][main].

We also sometimes use CS10 students as lab rats, and you can view beta labs on 
the CS10 [site][cs10].

However, the repository is setup so that any fork can be run using GitHub pages.
The main BJC repo can be viewed in a live state, [here](gh), or you can use your own fork by visiting the following url: `http://[username].github.io/bjc-r/`, where you replace `[username]` with your GitHub account name.

## Running Your Own Server
While GitHub pages are convenient, you'll likely want to run your own web server
to make debugging changes much more quick and easy. In order to view the labs, you'll need to have an Apache server running on your machine. Here are some simple instructions for a couple different platforms.

__No matter the platform, you should server files from `/bjc-r/` at the root of your server.__
### Mac OS X and Unix
The easiest way to setup a server is to use a simple, built-in Python server.
1. `cd` into one level above the `bjc-r` directory.
2. In a separate window run `python -m SimpleHTTPServer` (for Python 2) or `python3 -m http.server` for Python 3.
3. Navigate to [http://localhost:8000/bjc-r][localhost] in a browser.
4. That's it! :)

### Windows
Windows guide coming...sometime. However, the Python solution should work as well.

## Contributing
A basic guide on writing labs is, [here][authorship]. However, for the most part, all you need to do is write some HTML.
To contribute:
1. Create your own fork of `bjc-r`.
2. Optionally: Create a new branch for your feature.
3. Work away!
4. Create a pull request.
5. Get feedback on the pull request and make changes as needed.
6. Be super awesome! :)

Of course, submitting issues is always welcome and encouraged! These issues can be bugs, questions, improvements or anything you'd like to share.

## License
[CC-BY-NC-SA 3.0][cc]

![CC_IMG][cc_img]

<!-- Links for the doc -->
[authorship]: authorship.md
[cc]: http://creativecommons.org/licenses/by-nc-sa/3.0/
[cc_img]: http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png
[cs10]: http://cs10.berkeley.edu/labs
[llab]: http://github.com/beautyjoy/llab
[localhost]: http://localhost:8000/bjc-r
[main]: http://bjc.eecs.berkeley.edu/bjc-r/

