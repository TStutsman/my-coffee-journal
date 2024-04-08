def camel_to_snake(string):
    snake = ""
    for c in string:
        if c.isupper():
            snake += '_' + c.lower()
        else:
            snake += c
    return snake