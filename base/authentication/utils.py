import random
from django.core.mail import send_mail
from django.conf import settings


def send_activate_code(user, code: str):
    """
    Send activate code to new registered user
    """
    subject = "Activate code"
    message = f"""Hello {user}, we're delighted that you have joined us!
                Your activatecode is {code}"""
    to_email = user.email
    from_email = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, from_email, recipient_list=[to_email,], fail_silently=False)
    


def gen_activate_code() -> int | str:
    """
    Generatin 6-digit acivate code
    """
    return ''.join([str(random.randint(0, 9)) for _ in range(6)])
   

