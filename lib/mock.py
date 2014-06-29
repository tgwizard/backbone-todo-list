# -*- coding: utf-8 -

from uuid import uuid4

class TodoListRepo(object):
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
        current_item = self._get_list_item(list_id, updated_item['id'])
        current_item['done'] = updated_item['done']
        return current_item

    def update_list_item_position(self, list_id, item_id, pos):
        item = self._get_list_item(list_id, item_id)
        list = self.lists[list_id]
        list = filter(lambda t: t['id'] != item_id, self.lists[list_id])
        list.insert(pos, item)
        self.lists[list_id] = list

    def _get_list_item(self, list_id, item_id):
        if list_id not in self.lists:
            raise KeyError('Could not find list {}'.format(list_id))
        matched_items = filter(lambda t: t['id'] == item_id, self.lists[list_id])
        if len(matched_items) != 1:
            raise KeyError('Could not find item {} in list {}'.format(item_id, list_id))
        return matched_items[0]
