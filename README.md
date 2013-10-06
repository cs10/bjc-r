bjc-course
==========

The Beauty and Joy of Computing labs resource repository.

## Basic Structure
We have a simple directory structure for lab content.

## Viewing the Site
The main "production" server for labs is hosted at Berkeley, [here][main].

However, the repository is setup so that any fork can be run using GitHub pages.
The main BJC repo can be viewed in a live state, [here](gh), or you can use your own
fork by visiting the following url: `http://[username].github.io/bjc-r/`, where you
replace `[username]` with your GitHub account name.

## Running Your Own Server
While GitHub pages are convenient, you'll likely want to run your own web server
to make debugging changes much more quick and easy. In order to view the labs, you'll
need to have an Apache server running on your machine. Here are some simple instructions
for a couple different platforms.

__No matter the platform, you should server files from `/bjc-r/` at the root of your
server.__
### Mac OS X
1. Run the following command to start the apache server.
`sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist`
NOTE: The Apache server will be persistent across restarts.
2. Copy the `/bjc-r` directory to `/Library/WebServer/Documents/`
  (You may need administrator privileges to do this.)
3. Navigate to [http://localhost/bjc-r](http://localhost/bjc-r) in a browser.
4. To stop the sever from running do:
  `sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist`

### Windows


## Contributing

## License
[CC-BY-NC-SA 3.0][cc]
![CC_IMG][cc_img]


[main]:http://bjc.eecs.berkeley.edu/bjc-r/
[cc]:http://creativecommons.org/licenses/by-nc-sa/3.0/
[cc_img]:http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png
