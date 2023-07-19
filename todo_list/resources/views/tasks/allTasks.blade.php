@extends('layout')

@section('content')
    <div id="create_task">
        <h1 class="mb-4">Add New Task</h1>

        <div class="text-start">
            <label for="description">
            <input class="form-control shadow p-2 mb-3 bg-body rounded" type="text" name="description" placeholder="Task Description" id="task_description">
            
            @error('description')
                <div class="alert-danger" role="alert">
                    <p class="form-text">{{$message}}</p>
                </div>
            @enderror

            <div>
                <button class="btn btn-primary p-2" id="add-task" type="submit" data-create="{{ route('createTask') }}">Create</button>
            </div>
                
        </div>
    </div>

    @if(!is_null($tasks) && count($tasks) > 0)
        <div class="mb-4" id="all-tasks">
            <h1>All Tasks</h1>
            <div id="task-list">
                <ul class="list">
                    @foreach($tasks as $task)
                        <li class="card @if($task->isCompleted()) border-success @endif">
                            <div class="card-body">

                                <p>{{ $task->description }}</p>
                                <input type="hidden" name="id" value="{{ $task->id }}">

                                @if(!$task->isCompleted())
                                    <button class="btn btn-secondary" type="submit" data-update="{{ route('updateTask') }}">Complete</button>
                                @else
                                    <button class="btn btn-danger" type="submit" data-delete="{{ route('deleteTask') }}">Delete</button>
                                @endif
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif
@endsection