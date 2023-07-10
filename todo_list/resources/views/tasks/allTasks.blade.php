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

    @if(count($tasks) > 0)
        <div class="mb-4">
            <h1>All Tasks</h1>
            <div id="task-list">
                <ul>
                    @foreach($tasks as $task)
                        <li class="card @if($task->isCompleted()) border-success @endif">
                            <div class="card-body">

                                <p>{{ $task->description }}</p>

                                @if(!$task->isCompleted())
                                    <button class="btn btn-secondary complete-task" data-task-id="{{ $task->id }}">Complete</button>
                                @else
                                    <button class="btn btn-danger delete-task" data-task-id="{{ $task->id }}">Delete</button>
                                @endif

                                {{-- @if(!$task->isCompleted())
                                    <form action="/" method="POST" id="complete-task">
                                        @method('PATCH')
                                        @csrf
                                        <input type="hidden" name="id" value="{{ $task->id }}">
                                        <button class="btn btn-secondary" type="submit">Complete</button>
                                    </form>
                                @else
                                    <form action="/" method="POST" id="delete-task">
                                        @method('DELETE')
                                        @csrf
                                        <input type="hidden" name="id" value="{{ $task->id }}">
                                        <button class="btn btn-danger delete_task" type="submit">Delete</button>
                                    </form>
                                @endif --}}
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif
@endsection