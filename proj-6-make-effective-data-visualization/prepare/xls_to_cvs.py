# -*- coding: utf-8 -*-

import xlrd
import csv
prefectureMap = {
    "45": "JP.MZ",
    "24": "JP.ME",
    "25": "JP.SH",
    "26": "JP.KY",
    "27": "JP.OS",
    "20": "JP.NN",
    "21": "JP.GF",
    "22": "JP.SZ",
    "23": "JP.AI",
    "28": "JP.HG",
    "29": "JP.NR",
    "11": "JP.ST",
    "10": "JP.GM",
    "13": "JP.TK",
    "12": "JP.CH",
    "15": "JP.NI",
    "14": "JP.KN",
    "17": "JP.IS",
    "16": "JP.TY",
    "19": "JP.YN",
    "18": "JP.FI",
    "02": "JP.AO",
    "03": "JP.IW",
    "01": "JP.HK",
    "06": "JP.YT",
    "07": "JP.FS",
    "04": "JP.MG",
    "05": "JP.AK",
    "46": "JP.KS",
    "47": "JP.ON",
    "08": "JP.IB",
    "09": "JP.TC",
    "42": "JP.NS",
    "43": "JP.KM",
    "40": "JP.FO",
    "41": "JP.SG",
    "39": "JP.KC",
    "38": "JP.EH",
    "33": "JP.OY",
    "32": "JP.SM",
    "31": "JP.TT",
    "30": "JP.WK",
    "37": "JP.KG",
    "36": "JP.TS",
    "35": "JP.YC",
    "34": "JP.HS",
    "44": "JP.OT"
}
def parse_xls(xls_path, csv_path):
    wb = xlrd.open_workbook(xls_path)
    sheet = wb.sheet_by_index(0)
    csv_file = open(csv_path, 'wb')
    wr = csv.writer(csv_file, quoting=csv.QUOTE_ALL)
    keys = [sheet.cell(0, col_index).value for col_index in xrange(sheet.ncols)]
    wr.writerow(keys)
    for row in xrange(1, sheet.nrows):
        content = list(x.encode('utf-8') if type(x) == type(u'') else x for x in sheet.row_values(row))

        #if content[1] != '2014':
        #    continue
        if not content[0] == '00':
            print content[0]
            content[0] = prefectureMap[content[0]]
        else:
            content[0] = 'all'
        wr.writerow(
            content
        )
    csv_file.close()
    # data = [[sheet.cell_value(r, col) for col in range(sheet.ncols)] for r in range(sheet.nrows)]

if __name__ == "__main__":
    import os, sys

    BASE_PATH = os.path.dirname(os.path.abspath(__file__))
    xls_name = sys.argv[1]
    csv_name = sys.argv[2]
    xls_path = os.path.join(BASE_PATH, xls_name)
    csv_path = os.path.join(BASE_PATH, csv_name)
    print xls_path
    print csv_path
    parse_xls(xls_path, csv_path)
    print "done"