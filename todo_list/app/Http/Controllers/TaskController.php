<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    public function allTasks()
    {
        $tasks = Task::orderBy('completed', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        return view('tasks/allTasks', [
            'tasks' => $tasks,
        ]);
    }

    public function createTask(Request $request)
    {
        request()->validate([
            'description' => 'required|max:255'
        ]);

        $task = Task::create([
            'description' => $request->input('description'),
        ]);

        return response()->json([
            'id' => $task->id,
            'description' => $request->input('description'),
            'completed' => null
        ]);
    }

    public function updateTask(Request $request)
    {
        $id = $request->input('id');

        $task = Task::findOrFail($id);

        $task->completed = now();

        $task->save();

        return response()->json(['id' => $task->id]);
    }

    public function deleteTask(Request $request)
    {
        $id = $request->input('id');

        $task = Task::findOrFail($id);

        $task->delete();

        return response()->json(['id' => $task->id]);
    }
}