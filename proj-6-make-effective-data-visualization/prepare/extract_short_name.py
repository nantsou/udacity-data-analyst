# -*- coding: utf-8 -*-


def extract_short_name(js_path):
    with open(js_path, 'r') as js:
        content =  js.readline()
        elems = content.split(',')
        name = []
        short_name = []
        for elem in elems:
            # properties:{name:"Yamaguchi"},id:"JP.YC"
            if 'properties:{name:' in elem or 'id:"JP' in elem:
                if 'properties' in elem:
                    if 'null' in elem:
                        continue
                    if 'Hy' in elem[17:-1]:
                        name.append("Hyogo")
                    else:
                        name.append(elem[17:-1])
                if 'id:"JP' in elem:
                    short_name.append(elem[3:])

        sets = []
        for key, val in zip(short_name, name):
            print '{0}:{1},'.format(key, val)



if __name__ == "__main__":
    import os, sys

    BASE_PATH = os.path.dirname(os.path.abspath(__file__))
    file_name = sys.argv[1]
    js_path = os.path.join(BASE_PATH, file_name)
    extract_short_name(js_path)
    print "done"