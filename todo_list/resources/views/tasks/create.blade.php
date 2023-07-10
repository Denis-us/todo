@extends('layout')

@section('content')
<div>
    <h1 class="mb-4">Add New Task</h1>

    <form class="text-start" id="add-task" action="/" method="POST">
        @csrf
        <label for="description">
        <input class="form-control shadow p-2 mb-3 bg-body rounded" type="text" name="description" placeholder="Task Description">
        
        @error('description')
            <div class="alert-danger" role="alert">
                <p class="form-text">{{$message}}</p>
            </div>
        @enderror

        <div>
            <button class="btn btn-primary p-2" type="submit">Create</button>
        </div>
            
    </form>
</div>
@endsection