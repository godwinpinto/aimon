<script>
import axios from 'axios';



export default {
    name: 'my-component',
    data() {
        return {
            columns: [
                { field: "id", label: "Unique ID" },
                {
                    field: "user_id",
                    label: "User ID",
                },
                {
                    field: "action",
                    label: "Action",
                },
                {
                    field: "created_dt",
                    label: "DateTime",
                },
                {
                    field: "domain",
                    label: "Domain",
                },
                {
                    field: "content",
                    label: "Short Content",
                },
            ],
            rows: [
            ],
        };
    },
    created() {
        // Make the Axios request here and populate the rows data
        axios.get('/api/event_history') // Replace with your API endpoint URL
            .then(response => {
                // Assuming your API response is an array of objects similar to the "rows" data property structure
                this.rows = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
};
</script>
<template>
    <div class="card w-full p-6 bg-base-100 shadow-xl mt-6">
        <div class="text-xl font-semibold inline-block">
            Summary Data (last 200 records)
            <div class="inline-block float-right">
                <div class="tooltip" data-tip="Overall event summary in last 24hours. Includes visits / C/X/P events on those sites">
                    <img src="@/assets/info.svg"/>
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
}" theme="nocturnal" >
                            <template #table-row="props">
                                <span v-if="props.column.field == 'action'">
                                    <span
                                        >{{ props.row.action == "C" ? "Copy" : props.row.action == "P" ?"Paste":props.row.action == "X" ?"Cut":"Browsed" }}</span>
                                </span>
                                <span v-else>
                                    {{ props.formattedRow[props.column.field] }}
                                </span>
                            </template>
</vue-good-table>
        </div>
    </div>
</template>
  
