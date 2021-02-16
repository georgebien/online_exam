$(document).ready(function () {
    SONGS.loadSongs();
});

const SONGS = (() => {

    let this_songs = {};

    this_songs.loadSongs = () => {
        $.ajax({
            url : 'load-song',
            type: 'get',
            success: data => 
            {
                if (data.status === 'Success')
                {
                    $('#tbl_songs').DataTable().destroy();
                    $('#tbl_tbody_songs').empty();

                    let tr = '';
                    data.data.forEach((value) => {
                        tr += `
                        <tr>
                            <td style="vertical-align: middle;" nowrap align="center">${value.title}</td>
                            <td style="vertical-align: middle;" nowrap align="center">${value.artist}</td>
                            <td style="vertical-align: middle;" nowrap align="center">${value.lyrics}</td>
                            <td style="vertical-align: middle;" nowrap align="center">${value.created_at}</td>
                            <td style="vertical-align: middle;" nowrap align="center">
                                <button class="btn btn-primary btn-sm" onclick="SONGS.modalOpen('update',${value.id},'${value.title}','${value.artist}','${value.lyrics}')">UPDATE</button>
                                <button class="btn btn-danger btn-sm" onclick="SONGS.deleteSong(${value.id})">DELETE</button>
                            </td>
                        </tr>`;
                    });

                    $('#tbl_tbody_songs').html(tr);
                    $('#tbl_songs').DataTable({
                        "paging": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "autoWidth": true,
                    });
                }
                else
                {
                    Swal.fire({
                        icon: 'success',
                        title: result.status,
                        text: result.message,
                    })
                }
            }
        });
    };

    this_songs.modalOpen = (action,id,title,artist,lyrics) => {

        $('#modal_song').modal('show');
        $('#modal_song_title').text((action === 'add') ? 'ADD SONG' : 'UPDATE SONG');

        if (action === 'update')
        {
            $('#txt_id').val(id);
            $('#txt_title').val(title);
            $('#txt_artist').val(artist);
            $('#txt_lyrics').val(lyrics);
        }
        else
        {
            $('#txt_id').val('');
            $('#txt_title').val('');
            $('#txt_artist').val('');
            $('#txt_lyrics').val('');
        }
    };

    this_songs.saveSong = () => {
        
        let title   = $('#txt_title').val();
        let artist  = $('#txt_artist').val();
        let lyrics  = $('#txt_lyrics').val();
        let id      = $('#txt_id').val();
        
        $('#span_required_title').remove();
        $('#span_required_artist').remove();
        $('#span_required_lyrics').remove();

        if (title === '') 
        {
            $('#txt_title').after('<span id="span_required_title" class="span-required">Required</span>');
        }
        else  if (artist === '') 
        {
            $('#txt_artist').after('<span id="span_required_artist" class="span-required">Required</span>');
        }
        else if (lyrics === '')
        {
            $('#txt_lyrics').after('<span id="span_required_lyrics" class="span-required">Required</span>');
        }
        else 
        {
            Swal.fire($.extend(swal_options, {
                title: 'Are you sure you want to save?',
            })).then((result) => {
                if (result.value) {
                    $.ajax({
                        url : 'save-song',
                        type: 'post',
                        data:
                        {
                            _token : _TOKEN,
                            id     : id,
                            title  : title,
                            artist : artist,
                            lyrics : lyrics,
                        },
                        success: result => {
                            
                            if (result.status === 'Success')
                            {
                                Swal.fire({
                                    icon: 'success',
                                    title: result.status,
                                    text: result.message,
                                })
                                $('#modal_song').modal('hide');
                                SONGS.loadSongs();
                            }
                            else
                            {
                                Swal.fire({
                                    icon: 'success',
                                    title: result.status,
                                    text: result.message,
                                })
                            }
                        }
                    });
                }
            })
        }
    };

    this_songs.deleteSong = (id) => {

        Swal.fire($.extend(swal_options, {
            title: 'Are you sure you want to delete?',
        })).then((result) => {
            if (result.value) {
                $.ajax({
                    url : 'delete-song',
                    type: 'delete',
                    data:
                    {
                        _token : _TOKEN,
                        id     : id,
                    },
                    success: result => {
                        
                        if (result.status === 'Success')
                        {
                            Swal.fire({
                                icon: 'success',
                                title: result.status,
                                text: result.message,
                            })
                            $('#modal_song').modal('hide');
                            SONGS.loadSongs();
                        }
                        else
                        {
                            Swal.fire({
                                icon: 'error',
                                title: result.status,
                                text: result.message,
                            })
                        }
                    }
                });
            }
        })
    };

    return this_songs;
})();
