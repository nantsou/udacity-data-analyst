# -*- coding: utf-8 -*-

import os
import csv
from math import sqrt

SCRIPT_PATH = os.path.dirname(os.path.realpath(__file__))
PARENT_PATH = os.path.abspath(os.path.join(SCRIPT_PATH, os.pardir))
DATA_PATH = os.path.join(PARENT_PATH, 'data')

BASELINE_INFO = {
    'page_views': 40000,
    'clicks': 3200,
    'enrollments': 660,
    'click-thorugh-probability': 0.08,
    'p-enroll-click': 0.20625,
    'p-pay-enroll': 0.53,
    'p-pay-click': 0.1093125
}


def parse_cvs(file_name):
    file_path = os.path.join(DATA_PATH, file_name)
    data = []

    with open(file_path, 'r') as f:
        for line in csv.reader(f):
            # remove date info
            line.pop(0)
            data.append(line)

    return data


def reform_data(data):
    reformed_data = dict()

    reformed_data['total_pageviews'] = 0
    reformed_data['effect_size_pageviews'] = 0
    reformed_data['total_clicks'] = 0
    reformed_data['effect_size_clicks'] = 0
    reformed_data['enrollments'] = 0
    reformed_data['payments'] = 0

    # remove header
    data.pop(0)

    # column: Date Pageviews,  Clicks,  Enrollments, Payments
    for line in data:
        reformed_data['total_pageviews'] += int(line[0])
        reformed_data['total_clicks'] += int(line[1])
        if line[2] and line[3]:
            reformed_data['effect_size_pageviews'] += int(line[0])
            reformed_data['effect_size_clicks'] += int(line[1])
            reformed_data['enrollments'] += int(line[2])
            reformed_data['payments'] += int(line[3])

    return reformed_data


def get_csv_data(file_name):
    list_data = parse_cvs(file_name)
    dict_data = reform_data(list_data)

    return list_data, dict_data


def cal_estimation(page_views=5000):
    # Gross conversion
    se_gc_baseline = sqrt(
        BASELINE_INFO['p-enroll-click'] * (1-BASELINE_INFO['p-enroll-click']) / BASELINE_INFO['clicks'])
    se_gc_cal = se_gc_baseline * sqrt(BASELINE_INFO['page_views'] / page_views)

    # Retention
    se_r_baseline = sqrt(
        BASELINE_INFO['p-pay-enroll'] * (1 - BASELINE_INFO['p-pay-enroll']) / BASELINE_INFO['enrollments'])
    se_r_cal = se_r_baseline * sqrt(BASELINE_INFO['page_views'] / page_views)

    # Retention
    se_nc_baseline = sqrt(
        BASELINE_INFO['p-pay-click'] * (1 - BASELINE_INFO['p-pay-click']) / BASELINE_INFO['clicks'])
    se_nc_cal = se_nc_baseline * sqrt(BASELINE_INFO['page_views'] / page_views)

    print 'Gross conversion: {:.4f}'.format(se_gc_cal)
    print 'Retention: {:.4f}'.format(se_r_cal)
    print 'Net conversion: {:.4f}'.format(se_nc_cal)


def sanity_checks(expected_val, n_cont, n_exp):
    n_total = n_cont + n_exp
    observed_val = float(n_cont) / float(n_total)
    se = sqrt(expected_val * (1 - expected_val) / (n_cont + n_exp))

    # error margin at 95% confidence: z-value is 1.96
    err_margin = se * 1.96
    ci_low = expected_val - err_margin
    ci_high = expected_val + err_margin

    return n_total, observed_val, ci_low, ci_high


def sanity_checks_ctp(ctp_c, pageviews_cont, clicks_exp, pageviews_exp):
    # z-value of 95% confident interval
    z_value = 1.96

    ctp_e = float(clicks_exp) / float(pageviews_exp)
    se = sqrt(ctp_c * (1 - ctp_c) / pageviews_cont)

    err_margin = se * z_value
    ci_low = ctp_c - err_margin
    ci_high = ctp_c + err_margin

    return ctp_e, ci_low, ci_high


def effect_size_test(cont_clicks, cont_target_value, exp_clicks, exp_target_value):

    # z-value of 95% confident interval
    z_value = 1.96

    cont_rate = float(cont_target_value) / float(cont_clicks)
    exp_rate = float(exp_target_value) / float(exp_clicks)
    d_hat = exp_rate - cont_rate

    var_cont = (cont_rate * (1 - cont_rate)) / float(cont_clicks)
    var_exp = (exp_rate * (1 - exp_rate)) / float(exp_clicks)
    var_d = var_cont + var_exp

    se = sqrt(var_d)
    err_margin = se * z_value
    ci_low = d_hat - err_margin
    ci_high = d_hat + err_margin

    return d_hat, ci_low, ci_high


def show_daily_comparison(cont_list_data, exp_list_data, target):
    n_trial = 0
    n_success = 0
    target_index = 2 if target == 'gc' else 3

    for cont_line, exp_line in zip(cont_list_data, exp_list_data):
        if cont_line[2] and cont_line[3] and exp_line[2] and exp_line[3]:
            p_had_cont = float(cont_line[target_index]) / float(cont_line[1])
            p_had_exp = float(exp_line[target_index]) / float(exp_line[1])
            n_trial += 1
            if abs(p_had_exp) > abs(p_had_cont):
                n_success += 1

    return n_trial, n_success


if __name__ == "__main__":

    # calculate analytical estimation
    print 'calculate analytical estimation'
    cal_estimation()

    print ''
    # calculate empirical estimation
    print 'calculate empirical estimation'
    cal_estimation(page_views=10000)

    # get csv data
    cont_list_data, cont_dict_data = get_csv_data('control.csv')
    exp_list_data, exp_dict_data = get_csv_data('experiment.csv')

    print ''
    # sanity checks
    print 'sanity checks'
    ## Number of cookies
    print '##Number of cookies'
    n_cont = cont_dict_data['total_pageviews']
    n_exp = exp_dict_data['total_pageviews']
    n_total, observed_val, ci_low, ci_high = sanity_checks(0.5, n_cont, n_exp)

    print 'Total page views of control group: {}'.format(n_cont)
    print 'Total page views of experiment group: {}'.format(n_exp)
    print 'Total page views : {}'.format(n_total)
    print 'Expected value: 0.5'
    print 'Observed value: {:.4f}'.format(observed_val)
    print 'Confident interval: [{0:.4f}, {1:.4f}]'.format(ci_low, ci_high)

    print ''
    ## Number of clicks
    print '## Number of clicks'
    n_cont = cont_dict_data['total_clicks']
    n_exp = exp_dict_data['total_clicks']
    n_total, observed_val, ci_low, ci_high = sanity_checks(0.5, n_cont, n_exp)

    print 'Total clicks of control group: {}'.format(n_cont)
    print 'Total clicks of experiment group: {}'.format(n_exp)
    print 'Total clicks : {}'.format(n_total)
    print 'Expected value: 0.5'
    print 'Observed value: {:.4f}'.format(observed_val)
    print 'Confident interval: [{0:.4f}, {1:.4f}]'.format(ci_low, ci_high)

    print ''
    ## Click-through-probability
    print '## Click-through-probability'
    ctp_cont = float(cont_dict_data['total_clicks']) / float(cont_dict_data['total_pageviews'])
    ctp_e, ci_low, ci_high = sanity_checks_ctp(ctp_cont,
                                               cont_dict_data['total_pageviews'],
                                               exp_dict_data['total_clicks'],
                                               exp_dict_data['total_pageviews'])

    print 'Click-through-probability of control group: {}'.format(ctp_cont)
    print 'Click-through-probability of experiment group: {}'.format(ctp_cont)
    print 'Confident interval: [{0:.4f}, {1:.4f}]'.format(ci_low, ci_high)

    print ''

    # effect size tests
    print 'effect size tests'
    ## Gross conversion
    print '## Gross conversion'
    d_hat, ci_low, ci_high = effect_size_test(cont_dict_data['effect_size_clicks'],
                                              cont_dict_data['enrollments'],
                                              exp_dict_data['effect_size_clicks'],
                                              exp_dict_data['enrollments'])

    print 'Minimum Detectable Difference: (-)0.01'
    print 'Observed Difference: {:.4f}'.format(d_hat)
    print 'Confident interval: [{0:.4f}, {1:.4f}]'.format(ci_low, ci_high)

    print ''
    ## Net conversion
    print '## Net conversion'
    d_hat, ci_low, ci_high = effect_size_test(cont_dict_data['effect_size_clicks'],
                                              cont_dict_data['payments'],
                                              exp_dict_data['effect_size_clicks'],
                                              exp_dict_data['payments'])

    print 'Minimum Detectable Difference: (-)0.0075'
    print 'Observed Difference: {:.4f}'.format(d_hat)
    print 'Confident interval: [{0:.4f}, {1:.4f}]'.format(ci_low, ci_high)

    print ''
    # sign test
    print 'sing test'
    ## Gross conversion
    print '## Gross conversion'
    n_trial, n_success = show_daily_comparison(cont_list_data, exp_list_data, 'gc')

    print 'Number of trial: {}'.format(n_trial)
    print 'Number of success: {}'.format(n_success)

    print ''
    ## Net conversion
    print '## Net conversion'
    n_trial, n_success = show_daily_comparison(cont_list_data, exp_list_data, 'nc')

    print 'Number of trial: {}'.format(n_trial)
    print 'Number of success: {}'.format(n_success)