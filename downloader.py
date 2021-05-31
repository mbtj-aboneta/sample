import requests, shutil
import sys

print("Hello from python!")
links = sys.argv[1][2:-2].split('","')
for link in links:
    print(link.split("/")[-1])
    r = requests.get(link, stream = True)
    filename = link.split("/")[-1]
    if r.status_code == 200:
        print("200 okay",end="\t")
        r.raw.decode_content = True
        with open(filename,"wb") as f:
            shutil.copyfileobj(r.raw,f) #write binary
            shutil.move(''.join(["./",filename]),"".join(["./images/",filename]))
        print("downloaded " + filename)
    else:
        print("woops")

