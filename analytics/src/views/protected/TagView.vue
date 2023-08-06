<script>
import axios from 'axios';

export default {
    name: 'my-component',
    data() {
        return {
            columns: [
                { field: "tag_name", label: "Tag Name" },
                {
                    field: "tag_type",
                    label: "Tag Type",
                },
                {
                    field: "created_dt",
                    label: "Create Date",
                },
            ],
            rows: [
            ],
        };
    },
    created() {
        // Make the Axios request here and populate the rows data
        axios.get('/api/tag_view') // Replace with your API endpoint URL
            .then(response => {
                // Assuming your API response is an array of objects similar to the "rows" data property structure
                this.rows = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
    methods: {
        demo() {
            alert("TODO:: This functionality would allow adminstrator to add more records");
        }
    }
};


</script>
<template>
    <div class="flex-1 overflow-y-auto pt-8 px-6  bg-base-200  min-h-screen">

        <div class="grid mt-2 ml-0">
            <div class='h-full w-full pb-1'>


                <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
                    <div class="text-xl font-semibold inline-block">
                        Sensitive Content Tags Management
                        <div class="inline-block float-right">
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" @click="demo()">Add New</button>
                            </div>
                        </div>
                    </div>
                    <div class="divider mt-2"></div>
                    <div class='h-full w-full pb-1 bg-base-100'>

                        <vue-good-table :columns="columns" :rows="rows" :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 10,
                            position: 'bottom',
                            perPageDropdown: [10, 25, 50],
                            dropdownAllowAll: false,
                            setCurrentPage: 1,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All'
                        }" :search-options="{
    enabled: true
}" theme="nocturnal">
                            <template #table-row="props">
                                <span v-if="props.column.field == 'tag_type'">
                                    <span>{{ props.row.tag_type == "C" ? "Critical" : "Ignored" }}</span>
                                </span>
                                <span v-else>
                                    {{ props.formattedRow[props.column.field] }}
                                </span>
                            </template>
                        </vue-good-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>