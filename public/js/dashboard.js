$(document).ready(function() {
    if ($(window).width() < 768) {
        $('.main').toggleClass('active');
        $('.sidebar-overlay').toggleClass('hidden');
        $('.sidebar-menu').toggleClass('-translate-x-full');
    }

    $(document).on('click', '.sidebar-toggle', function () {
        $('.main').toggleClass('active');
        $('.sidebar-overlay').toggleClass('hidden');
        $('.sidebar-menu').toggleClass('-translate-x-full');
    });

    $(document).on('click', '.sidebar-overlay', function () {
        $('.main').addClass('active');
        $('.sidebar-overlay').addClass('hidden');
        $('.sidebar-menu').addClass('-translate-x-full');
    });

    $('.sidebar-dropdown-toggle').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            const $parent = $(this).closest('.group');
            if ($parent.hasClass('selected')) {
                $parent.removeClass('selected');
            } else {
                $('.sidebar-dropdown-toggle').each(function () {
                    $(this).closest('.group').removeClass('selected');
                });
                $parent.addClass('selected');
            }
        });
    });
    // end: Sidebar

    // start: Popper
    // const popperInstance = {};
    // $('.dropdown').each(function (index) {
    //     const $item = $(this);
    //     const popperId = 'popper-' + index;
    //     const $toggle = $item.find('.dropdown-toggle');
    //     const $menu = $item.find('.dropdown-menu');
    //     $menu.data('popperId', popperId);
    //     popperInstance[popperId] = Popper.createPopper($toggle[0], $menu[0], {
    //         modifiers: [
    //             {
    //                 name: 'offset',
    //                 options: {
    //                     offset: [0, 8],
    //                 },
    //             },
    //             {
    //                 name: 'preventOverflow',
    //                 options: {
    //                     padding: 24,
    //                 },
    //             },
    //         ],
    //         placement: 'bottom-end'
    //     });
    // });

    // $(document).on('click', function (e) {
    //     const $toggle = $(e.target).closest('.dropdown-toggle');
    //     const $menu = $(e.target).closest('.dropdown-menu');
    //     if ($toggle.length) {
    //         const $menuEl = $toggle.closest('.dropdown').find('.dropdown-menu');
    //         const popperId = $menuEl.data('popperId');
    //         if ($menuEl.hasClass('hidden')) {
    //             hideDropdown();
    //             $menuEl.removeClass('hidden');
    //             showPopper(popperId);
    //         } else {
    //             $menuEl.addClass('hidden');
    //             hidePopper(popperId);
    //         }
    //     } else if (!$menu.length) {
    //         hideDropdown();
    //     }
    // });

    // function hideDropdown() {
    //     $('.dropdown-menu').each(function () {
    //         $(this).addClass('hidden');
    //     });
    // }

    // function showPopper(popperId) {
    //     popperInstance[popperId].setOptions(function (options) {
    //         return {
    //             ...options,
    //             modifiers: [
    //                 ...options.modifiers,
    //                 { name: 'eventListeners', enabled: true },
    //             ],
    //         };
    //     });
    //     popperInstance[popperId].update();
    // }

    // function hidePopper(popperId) {
    //     popperInstance[popperId].setOptions(function (options) {
    //         return {
    //             ...options,
    //             modifiers: [
    //                 ...options.modifiers,
    //                 { name: 'eventListeners', enabled: false },
    //             ],
    //         };
    //     });
    // }
    // end: Popper

    // start: Tab
    $('[data-tab]').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            const tab = $(this).data('tab');
            const page = $(this).data('tabPage');
            const $target = $('[data-tab-for="' + tab + '"][data-page="' + page + '"]');
            $('[data-tab="' + tab + '"]').removeClass('active');
            $('[data-tab-for="' + tab + '"]').addClass('hidden');
            $(this).addClass('active');
            $target.removeClass('hidden');
        });
    });
    // end: Tab

    // start: Chart
    // new Chart($('#order-chart'), {
    //     type: 'line',
    //     data: {
    //         labels: generateNDays(7),
    //         datasets: [
    //             {
    //                 label: 'Active',
    //                 data: generateRandomData(7),
    //                 borderWidth: 1,
    //                 fill: true,
    //                 pointBackgroundColor: 'rgb(59, 130, 246)',
    //                 borderColor: 'rgb(59, 130, 246)',
    //                 backgroundColor: 'rgb(59 130 246 / .05)',
    //                 tension: .2
    //             },
    //             {
    //                 label: 'Completed',
    //                 data: generateRandomData(7),
    //                 borderWidth: 1,
    //                 fill: true,
    //                 pointBackgroundColor: 'rgb(16, 185, 129)',
    //                 borderColor: 'rgb(16, 185, 129)',
    //                 backgroundColor: 'rgb(16 185 129 / .05)',
    //                 tension: .2
    //             },
    //             {
    //                 label: 'Canceled',
    //                 data: generateRandomData(7),
    //                 borderWidth: 1,
    //                 fill: true,
    //                 pointBackgroundColor: 'rgb(244, 63, 94)',
    //                 borderColor: 'rgb(244, 63, 94)',
    //                 backgroundColor: 'rgb(244 63 94 / .05)',
    //                 tension: .2
    //             },
    //         ]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });

    // function generateNDays(n) {
    //     const data = [];
    //     for (let i = 0; i < n; i++) {
    //         const date = new Date();
    //         date.setDate(date.getDate() - i);
    //         data.push(date.toLocaleString('en-US', {
    //             month: 'short',
    //             day: 'numeric'
    //         }));
    //     }
    //     return data;
    // }

    // function generateRandomData(n) {
    //     const data = [];
    //     for (let i = 0; i < n; i++) {
    //         data.push(Math.round(Math.random() * 10));
    //     }
    //     return data;
    // }
    // end: Chart

    // $('#users-table').DataTable();
})
