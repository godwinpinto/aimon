
<script>
import axios from 'axios';


export default {
    name: 'my-component',
    props: {
        params: String, // Define the prop for the API endpoint URL
    },
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
            ],        };
    },
    created() {

        console.log("this.params", this.params);

      const actionCode=this.params=="Copy"?"C":this.params=="Paste"?"P":"X";
console.log(actionCode)
        // Make the Axios request here and populate the rows data
        axios.post('/api/transaction_overview_details', {
            action: actionCode, // Replace 'your_action_value' with the actual value you want to send as the 'action' parameter
        })
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
    <div class="flex-1 overflow-y-auto  ">

        <div class="grid mt-2 ml-0">
            <div class='w-full pb-1 '>

                <div class="w-full bg-base-100 shadow-xl mt-0">
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
            </div>
        </div>
    </div>
</template>