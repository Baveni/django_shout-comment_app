from django.shortcuts import render, redirect

from .models import Comment
from .forms import CommentForm


def index(request):

    comments = Comment.objects.order_by('-date_added')

    context = {'comments': comments}

    return render(request, 'shout_app/index.html', context)


def shout(request):

    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            new_comment = Comment(name=request.POST['name'], comment=request.POST['comment'])
            new_comment.save()
            return redirect('index')
    else:
        form = CommentForm()

    context = {'form': form}
    return render(request, 'shout_app/shout.html', context)
