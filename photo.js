$(document).ready(function () {
    var photos = [
        { files: ['./img/photo.1.jpg'], title: 'Photo 1', description: 'Description for Photo 1' },
        { files: ['./img/photo.2.jpg'], title: 'Photo 2', description: 'Description for Photo 2' },
        { files: ['./img/photo.3.jpg'], title: 'Photo 3', description: 'Description for Photo 3' },
        { files: ['./img/photo.4.jpg'], title: 'Photo 4', description: 'Description for Photo 4' }
    ];

    var currentIndex = 0;

    var $grid = $('#photoGallery').masonry({
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 10,
        fitWidth: true
    });

    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $('#addPhotoBtn').click(function () {
        $('#addPhotoLightbox').fadeIn().css('display', 'flex');
    });

    $('#closeAddPhotoLightboxBtn').click(function () {
        $('#addPhotoLightbox').fadeOut();
    });

    $('#savePhotoBtn').click(function () {
        var files = $('#photoInput')[0].files;
        var title = $('#photoTitle').val();
        var description = $('#photoDescription').val();

        if (files.length > 0) {
            var firstFileUrl = URL.createObjectURL(files[0]);
            var $item = $('<div class="grid-item" data-index="' + photos.length + '"><img src="' + firstFileUrl + '"><div class="grid-item-title">' + title + '</div></div>');
            $grid.append($item).masonry('appended', $item);
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });

            photos.push({
                files: Array.from(files).map(file => URL.createObjectURL(file)),
                title: title,
                description: description
            });
        }

        $('#addPhotoLightbox').fadeOut();
    });

    $(document).on('click', '.grid-item', function () {
        currentIndex = $(this).data('index');
        openLightbox(currentIndex);
    });

    $('#closeLightboxBtn').click(function () {
        $('#lightbox').fadeOut();
    });

    $('#likeBtn').click(function () {
        $(this).toggleClass('liked');
        if ($(this).hasClass('liked')) {
            $(this).text('❤ Liked');
        } else {
            $(this).text('♡ Like');
        }
    });

    $('#addCommentBtn').click(function () {
        var comment = $('#commentInput').val();
        if (comment) {
            $('#commentList').append('<p>' + comment + '</p>');
            $('#commentInput').val('');
        }
    });

    $('#prevBtn').click(function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : photos.length - 1;
        openLightbox(currentIndex);
    });

    $('#nextBtn').click(function () {
        currentIndex = (currentIndex < photos.length - 1) ? currentIndex + 1 : 0;
        openLightbox(currentIndex);
    });

    function openLightbox(index) {
        var photo = photos[index];
        $('#lightboxImages').empty();
        photo.files.forEach(function(fileUrl) {
            var $img = $('<img src="' + fileUrl + '">');
            $('#lightboxImages').append($img);
        });
        $('#lightboxTitle').text(photo.title);
        $('#lightboxDescription').text(photo.description);
        $('#lightbox').fadeIn().css('display', 'flex');
    }

    $('#searchInput').on('keydown', function (e) {
        if (e.key === 'Enter') {
            $('#searchBtn').click();
        }
    });

    $('#searchBtn').click(function () {
        var searchText = $('#searchInput').val().toLowerCase();
        var found = false;

        photos.forEach(function(photo, index) {
            if (photo.title.toLowerCase() === searchText) {
                openLightbox(index);
                found = true;
            }
        });

        if (!found) {
            alert('No matching photo found.');
        }
    });
});
