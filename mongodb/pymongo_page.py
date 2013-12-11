#!/usr/bin/env python
#coding=utf8

"""
使用pymongo实现的分页程序, 不使用skip,limit实现。
通过比较id来实现
"""

import unittest
from pymongo.connection import MongoClient


def init_connect(dbname="test", collection="page", host="localhost", port=27017):
    """ init the mongodb connection """
    conn = MongoClient(host, port)
    coll = conn[dbname][collection]
    return conn, coll


def page(cur_id, old_page, new_page):
    """
    分页主程
    cur_id: 当前页的第一元素id.
    old_page: 当前页数
    new_page: 请求的新页数
    """
    # TODO: the first request without cur_id handle

    conn, coll = init_connect()
    page_size = 20
    page_skip_limit = 8

    N = abs(old_page - new_page)
    if N >= page_skip_limit:
        raise Exception("not allow page skip more than %s" % page_skip_limit)

    if old_page > new_page: # go N page before
        data = coll.find({'_id': {'$lt': cur_id}}).skip(N * page_size).limit(page_size).sort({'_id': 1})

    else:
        data = coll.find({'_id': {'$gt': cur_id}}).skip((N-1) * page_size).limit(page_size).sort({'_id': 1})

    return data


class PageTest(unittest.TestCase):
    def init_db_for_test(self):
        pass

    def setUp(self):
        pass

    def test_page():
        pass


if __name__ == "main":
    unittest.main()
