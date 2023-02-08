Hello Hello....
Let's try some functionalities

Problem: var srcpath = path.resolve(cwd, header.linkname)
Solution: var srcpath = path.join(cwd, path.join('/', header.linkname))
