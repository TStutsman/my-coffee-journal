# Removes empty keys and converts camel to snake
def format_request(request):
    """
    format_request(req) takes a request body dictionary and removes keys
    with empty values, and converts keys from camelCase to snake_case
    """

    formatted_request = {}
    for key in list(request):
        # Checks if there is a value
        if request[key]:
            # Converts key to snake_case
            new_key = camel_to_snake(key)
            # Saves to return dict
            formatted_request[new_key] = request[key]

    return formatted_request


def camel_to_snake(string):
    snake = ""
    for c in string:
        if c.isupper():
            snake += '_' + c.lower()
        else:
            snake += c
    return snake