// $(document).ready(function() {
//     // Обработчик события отправки формы
//     $('#add-task-form').submit(function(event) {
//         event.preventDefault(); // Отменить стандартное действие отправки формы
//         var form = $(this);
//         var url = form.attr('action');
//         var method = form.attr('method');
//         var description = form.find('textarea[name="description"]').val();
//         $.ajax({
//             url: url,
//             method: method,
//             data: { description: description },
//             success: function(response) {
//                 // Обработка успешного ответа от сервера
//                 var tasks = response.tasks;
//                 // Обновление списка задач на странице
//                 var taskList = $('#task-list ul');
//                 taskList.empty();
//                 tasks.forEach(function(task) {
//                     var listItem = $('<li>');
//                     listItem.append('<p>' + task.description + '</p>');
//                     listItem.append('<p>' + task.completed + '</p>');
//                     listItem.append('<a href="#" class="delete-task" data-task-id="' + task.id + '">Delete</a>');
//                     listItem.append('<button class="edit-task" data-task-id="' + task.id + '">Edit</button>');
//                     taskList.append(listItem);
//                 });
//                 // Очистка поля ввода
//                 form.find('textarea[name="description"]').val('');
//             }
//         });
//     });
$(document).ready(function() {
    $(document).on('click', '.complete-task', function() {
        let button = $(this);
        let taskId = button.data('task-id');
        console.log(button)
        
        $.ajax({
            url: '/',
            type: 'PATCH',
            data: {
                _token: '{{ csrf_token() }}',
                _method: 'PATCH',
                id: taskId
            },
            success: function(response) {
                // Update UI or perform actions after successful completion
                button.closest('.card').addClass('border-success');
            },
            error: function(xhr, status, error) {
                // Handle errors if needed
            }
        });
    });

    $(document).on('click', '.delete_task', function(e) {
        e.preventDefault(); // Отменить стандартное действие ссылки

        let button = $(this);
        let taskId = button.data('task-id');


        $.ajax({
            url: '/',
            type: 'DELETE',
            data: {
                _token: '{{ csrf_token() }}',
                _method: 'DELETE',
                id: taskId
            },
            success: function(response) {
                // Update UI or perform actions after successful deletion
                button.closest('.card').remove();
            },
            error: function(xhr, status, error) {
                // Handle errors if needed
            }
        });
    });
});