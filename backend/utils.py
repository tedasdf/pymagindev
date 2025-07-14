def find_match(lst, value):
    try:
        # Use list.index() to find the index of the value
        return lst[lst.index(value)]
    except ValueError:
        # If value is not found, return None
        return None