console.log('recipe: outside jQuery');

jQuery(document).ready(function($) {
    console.log('recipe: inside jQuery');

        // Define Table Mount
        var mount_table = $('#recipe-ingredient-table tbody');
        var ingr_data = $('#recipe_recipe_ingredients');
        var ingr_obj = $('#recipe_recipe_ingredients').val() ? JSON.parse($('#recipe_recipe_ingredients').val()) : [];
        console.log({ingr_obj: ingr_obj});
        var c_ingr_obj = ingr_obj.length;

        // Append Row To Recipe Ingredients
        function append_row_to_recipe_ingredients(this_el, mode) {

            //var obj = JSON.parse($('#recipe_recipe_ingredients').text());

            console.log('----------------------------------');
            console.log('append_row_to_recipe_ingredients');
            console.log({mode: mode, this_el_in_scope: this_el});
            if(mode == 'jquery') {
                var data_row = {
                    order: this_el.attr('data-order'),
                    usda_name: this_el.attr('data-usda-name'),
                    custom_name: this_el.find('.ingr-name').val(),
                    qty: this_el.find('.ingr-qty').val(),
                    unit: this_el.find('.ingr-unit').val(),
                    ndbno: this_el.attr('data-ndbno'),
                    group: this_el.attr('data-group'),
                    upc: this_el.attr('data-upc'),
                };
            } else if(mode == 'object') {
                var data_row = {
                    order: this_el.attributes['data-order'],
                    usda_name: this_el.attributes['data-usda-name'],
                    custom_name: this_el.children[1].children.length > 0 ? this_el.children[1].children[0].nodeValue : '',
                    qty: this_el.children[2].children.length > 0 ? this_el.children[2].children[0].nodeValue : '',
                    unit: this_el.children[3].children.length ? this_el.children[3].children[0].nodeValue : '',
                    ndbno: this_el.attributes['data-ndbno'],
                    group: this_el.attributes['data-group'],
                    upc: this_el.attributes['data-upc'],
                };
            }

            console.log({data_row: data_row});
            // Capture Recipe Ingredients Array-Obj
            var obj = JSON.parse(document.getElementById('recipe_recipe_ingredients').innerHTML);
            // Push a New Row into it
            obj.push(data_row);
            // Update Recipe Ingredient Array-Obj Field with Updated Object
            document.getElementById('recipe_recipe_ingredients').innerHTML = JSON.stringify(obj, undefined, 4);
            console.log('----------------------------------');
        }

        // Build Recipe Ingredients Object
        function update_recipe_ingredients(mode) {
            console.log('--------------------------------------------');
            console.log('update_recipe_ingredients');
            let mount_table = $('#recipe-ingredient-table tbody');

            let table_rows = mount_table.find('tr');
            console.log({table_rows: table_rows});

            document.getElementById('recipe_recipe_ingredients').innerHTML = JSON.stringify([], undefined, 4);

            if(mode === 'object') {

                let count_rows = table_rows.length;

                for(r=0; r<count_rows; r++) {
                    console.log({this_el_out_scope: table_rows[r], table_rows_r: table_rows[r]});
                    append_row_to_recipe_ingredients(table_rows[r], 'object');
                }

            } else if(mode === 'jquery') {
                // Update Recipe Ingredients Array-Obj with existing table rows
                mount_table.children('tr').each(function(i, e) {

                    append_row_to_recipe_ingredients($(this), 'jquery');

                });
            }

            //console.log({updated_recipe_ingredient: updated_obj});
            console.log('--------------------------------------------');
        }

        // Add to Recipe Ingredients
        function add_to_recipe_ingredients(ingr_row) {
            let obj = JSON.parse(document.getElementById('recipe_recipe_ingredients').innerHTML);
            obj.push(ingr_row);
            document.getElementById('recipe_recipe_ingredients').innerHTML = JSON.stringify(obj, undefined, 4);
        }

        // Invoke Sortability
        function invoke_sortability(elem) {
          $(elem).sortable({
              start: function(event, ui) {console.log({mode: 'start', event: event, ui: ui});},
              change: function(event, ui) {

                console.log({mode: 'change', event: event, ui: ui});

                // Update Recipe Ingredients
                //update_recipe_ingredients('object');

              },
              update: function(event, ui) {

                  console.log({mode: 'update', event: event, ui: ui});

                  mount_table.children('tr').each(function(index) {
                    ++index;
                      $(this).attr('data-order', index);
                      $(this).children('.sort-number').text(index);
                      console.log([index, $(this).attr('data-order')]);
                  });

                  // Update Recipe Ingredients
                  update_recipe_ingredients('jquery');
              },
          });
          $(elem).disableSelection();
        }

        // Render Ingredient Row
        function render_ingredient_row(mount_table, ingr_row) {
            let render_row_elem = `<tr class="ui-state-default" data-order="${ingr_row.order}" data-usda-name="${ingr_row.usda_name}" data-ndbno="${ingr_row.ndbno}" data-group="${ingr_row.group}" data-upc="${ingr_row.upc.replace(/\D/g,'').replace(' ', '')}"">
                                      <td class="sort-number">${ingr_row.order}</td>
                                      <td><input class="ingr-name form-control" type="text" value="${ingr_row.custom_name ? ingr_row.custom_name : ''}" name="ingredient_name" placeholder="${ingr_row.usda_name}" /></td>
                                      <td class="sm-col"><input class="ingr-qty form-control" type="number" step="0.01" name="ingredient_qty" value="${ingr_row.qty ? ingr_row.qty : '0'}" placeholder="0.00" /></td>
                                      <td class="sm-col"><input class="ingr-unit form-control" type="text" name="ingredient_unit" value="${ingr_row.unit ? ingr_row.unit : 'Unit'}" placeholder="tbsp" /></td>
                                      <td class="sm-col"><button class="delete-ingredient btn btn-sm btn-default" data-order="${ingr_row.order}">X</button></td>
                                  </tr>`;

            mount_table.append(render_row_elem);
            console.log({row_rendered: render_row_elem});
        }

        // Delete Ingredient
        function delete_ingredient(this_el) {
            if(this_el && this_el.attr('data-order')) {
                $('tr[data-order="'+this_el.attr('data-order')+'"]').remove();
                update_recipe_ingredients('jquery');
            }
        }

        //!!! Initialize Recipe Ingredients Table Rows with Recipe Ingredients Array-Object Data
        // if(ingr_data.text() == '') {
        //     ingr_data.text('[]');
        // } else {
        let ingr_obj_mount = ingr_data.text() ? JSON.parse(ingr_data.text()) : [];
        console.log({ingr_obj_mount: ingr_obj_mount});
        for(i=0; i<ingr_obj_mount.length;i++) {
            let ingr_row = ingr_obj[i];
            console.log({ingr_row:ingr_row});
            render_ingredient_row(mount_table, ingr_row);
        }
        // }

        // Search For Ingredient
        $('#ingredient-search').on('click', function(){
          var search_val = $('#ingredient-query').val();
          window.location.href = encodeURI('?q='+search_val);
        });

        // Add Ingredient to Recipe
        $('.add-recipe-ingredient').on('click', function() {
            let data_offset = $(this).attr('data-offset');
            let data_name = $(this).attr('data-name');
            let data_ndbno = $(this).attr('data-ndbno');
            let data_group = $(this).attr('data-group');
            let data_source = $(this).attr('data-source');
            let data_upc = $(this).attr('data-upc');

            let mount_table = $('#recipe-ingredient-table tbody');

            let count_rows = mount_table.children('tr').length;

            let ingr_row = {
                order: count_rows + 1,
                usda_name: data_name,
                ndbno: data_ndbno,
                group: data_group,
                source: data_source,
                upc: data_upc,
            };

            console.log(ingr_row);

            render_ingredient_row(mount_table, ingr_row);

            add_to_recipe_ingredients(ingr_row);

            // Reinvoke Ingredient Table Sortability
            invoke_sortability('#sortable-ingredients');

            // Update Recipe Ingredients
            //update_recipe_ingredients()
        });

        // Submit Recipe Action
        $('#submit-recipe').on('click', function() {
            console.log('clickkkked');
            // Update Recipe Ingredients
            update_recipe_ingredients('jquery');
        });

        $('.delete-ingredient').on('click', function(e) {
            e.preventDefault();
            var are_you_sure = confirm("Are you sure you want to delete this ingredient?");
            if(are_you_sure === true) {
                delete_ingredient($(this));
            } else {}
        });

        // Adjust Ingredient Order on Change
        mount_table.on('change', function() {
            console.log('table has changed');
            update_recipe_ingredients('jquery');
        });

        // Initiate Ingredient Table Sortability
        invoke_sortability('#sortable-ingredients');

        // Instantiate Ingredients Rendering
        // for(i = 0; i < c_ingr_obj; i++) {
        //     let ingr_row = ingr_obj[i];
        //     render_ingredient_row(mount_table, ingr_row);
        // }

});
