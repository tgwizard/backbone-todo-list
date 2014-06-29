# -*- coding: utf-8 -

from uuid import uuid4

class MockTodoListRepo(object):
    def __init__(self):
        self.lists = {}

    def get_list(self, list_id):
        if list_id not in self.lists:
            return []
        return self.lists[list_id]

    def create_list_item(self, list_id, new_item):
        if list_id not in self.lists:
            self.lists[list_id] = []
        new_item['id'] = str(uuid4())
        self.lists[list_id].append(new_item)
        return new_item

    def update_list_item(self, list_id, updated_item):
        if list_id not in self.lists:
            raise KeyError()
        print self.lists[list_id]
        matched_items = filter(lambda t: t['id'] == updated_item['id'], self.lists[list_id])
        if len(matched_items) != 1:
            raise KeyError('Could not find item {} in list {}'.format(updated_item['id'], list_id))
        current_item = matched_items[0]
        current_item['done'] = updated_item['done']
        return current_item
