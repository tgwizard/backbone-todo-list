# -*- coding: utf-8 -

from uuid import uuid4

class TodoListRepo(object):
    def __init__(self, db):
        self.todo_lists = db.todo_lists

    def get_list(self, list_id):
        list = self.todo_lists.find_one({ '_id': list_id }) or { 'items': [] }
        return list['items']

    def create_list_item(self, list_id, new_item):
        new_item['id'] = str(uuid4())
        self.todo_lists.update({ '_id': list_id }, { '$push': { 'items': new_item } }, upsert=True)
        return new_item

    def update_list_item(self, list_id, updated_item):
        self.todo_lists.update({ '_id': list_id, 'items.id': updated_item['id'] }, { '$set': { 'items.$': updated_item } })
        return updated_item

    def update_list_item_position(self, list_id, item_id, pos):
        list = self.todo_lists.find_one({ '_id': list_id, 'items.id': item_id }, { 'items.$': 1 })
        if list is None:
            raise KeyError('Could not find list')
        item = list['items'][0]
        self.todo_lists.update({ '_id': list_id }, { '$pull': { 'items': { 'id': item_id } } })
        self.todo_lists.update({ '_id': list_id }, { '$push': { 'items': { '$each': [item], '$position': pos } } })
