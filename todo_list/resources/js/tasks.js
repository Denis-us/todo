
    $(document).on('click', '#add-task', function(e) {
        e.preventDefault();

        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let newTask = $('#task_description').val();
        let allTaskUrl = $(this).data('create');
        
        $.ajax({
            url: allTaskUrl,
            type: 'POST',
            data: {
                _token: csrfToken,
                _method: 'POST',
                description: newTask
            },
            success: function(response) {
                $('#task_description').val('')
                let list = $('.list');
        
                if(list.length === 0) {
                    let createBlock = $('#create_task')

                    createBlock.after(`
                        <div class="mb-4" id="all-tasks">
                            <h1>All Tasks</h1>
                            <div id="task-list">
                                <ul class="list">
                                    <li class="card">
                                        <div class="card-body">
                                            <p>${response.description}</p>
                                            <input type="hidden" name="id" value="${response.id}">
                                            <button class="btn btn-secondary" type="submit" data-update="/">Complete</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    `);
                };

                let html = `
                        <li class="card ${response.completed ? 'border-success' : ''}">
                        <div class="card-body">
                            <p>${response.description}</p>
                            <input type="hidden" name="id" value="${response.id}">
                            ${response.completed
                                ? `<button class="btn btn-danger" type="submit" data-delete="/">Delete</button>`
                                : `<button class="btn btn-secondary" type="submit" data-update="/">Complete</button>`
                            }
                        </div>
                    </li>
                `;
                
                let completedTask = $('.border-success').last();

                if(completedTask.length === 0) {
                    list.append(html);
                } else {
                    completedTask.after(html);
                }
            },
            error: function(response) {
                console.log(response, 'error')
            }
        });
    });

    $(document).on('click', '.btn-secondary', function(e) {
        e.preventDefault();

        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let taskId = $(this).prev('input').val();
        let updateTaskUrl = $(this).data('update');

        $.ajax({
            url: updateTaskUrl,
            type: 'PATCH',
            data: {
                _token: csrfToken,
                _method: 'PATCH',
                id: taskId
            },
            success: function(response) {
                let input = $('input[value="' + response.id + '"]');
                input.next('.btn-secondary').remove();
                input.parents('.card').addClass('border-success');
                let deleteButton = `<button class="btn btn-danger" type="submit" data-delete="/">Delete</button>`;
                input.after(deleteButton);
            },
            error: function(response) {
                console.log(response, 'error')
            }
        });
    });

    $(document).on('click', '.btn-danger', function(e) {
        e.preventDefault();

        let csrfToken = $('meta[name="csrf-token"]').attr('content');
        let taskId = $(this).prev('input').val();
        let deleteTaskUrl = $(this).data('delete');

        $.ajax({
            url: deleteTaskUrl,
            type: 'DELETE',
            data: {
                _token: csrfToken,
                _method: 'DELETE',
                id: taskId
            },
            success: function(response) {
                let input = $('input[value="' + response.id + '"]');
                input.parents('.card').remove();

                let list = $('.list')
                if (list.find('li').length === 0) {
                    $('#all-tasks').remove()
                }
            },
            error: function(response) {
                console.log(response, 'error')
            }
        });
    });