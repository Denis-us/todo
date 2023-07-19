<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/', [TaskController::class, 'allTasks'])->name('allTasks');
Route::post('/', [TaskController::class, 'createTask'])->name('createTask');
Route::patch('/', [TaskController::class, 'updateTask'])->name('updateTask');
Route::delete('/', [TaskController::class, 'deleteTask'])->name('deleteTask');