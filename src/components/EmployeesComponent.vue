<template>
    <div class="container container-task">
        <div class="row my-3">
            <div class="col-auto mr-auto">
                <h2 class="text-secondary">Lista de Empleados</h2>
            </div>
            <div class="col-auto">
               <button class="right btn btn-primary" v-b-modal.modal-1 @click="showModal = true">Agregar</button>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-md-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Tipo ID</th>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Cat</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="employee in employees" :key="employee.id">
                            <td v-text="employee.tipo_id"></td>
                            <td v-text="employee.id"></td>
                            <td v-text="employee.nombre"></td>
                            <td v-text="employee.apellido"></td>
                            <td v-text="employee.cat"></td>
                            <td v-text="employee.edad"></td>
                            <td v-text="employee.cargo"></td>
                            <td>
                                <button class="btn btn-warning btn-sm" v-b-modal.edit-employee v-on:click="editEmployee(employee)">
                                    <span class="fa fa-edit"></span>
                                </button>
                                <button class="btn btn-danger btn-sm" v-on:click="deleteEmployee(employee.id)">
                                    <span class="fa fa-trash"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal para agregar empleados -->
        <AddEmployee ref="employeeModal" @getEmployees="getEmployees"></AddEmployee>

        <!-- Modal para editar empleados -->
        <EditEmployee ref="editEmployeeModal" :editEmployeeData="this.editData" @getEmployees="getEmployees"></EditEmployee>

    </div>
</template>

<script>

    // Components
    import AddEmployee from "./AddEmployee";
    import EditEmployee from "./EditEmployee";

    export default {

        data() {
            return {
                employees: [],
                editData: {}
            }
        },

        components: {
            AddEmployee,
            EditEmployee
        },

        mounted() {
            this.getEmployees();
        },

        methods: {

            getEmployees() {
                this.axios
                    .get('https://app-giving.herokuapp.com/api/empleado')
                    .then(response => (this.employees = response.data.data))
                    .catch(error => console.log(error))
            },

            editEmployee(employee) {
                this.editData = employee;
            },

            deleteEmployee(id){
                if (confirm('Esta seguro de eliminar el registro?')) {
                    this.axios
                    .delete('https://app-giving.herokuapp.com/api/empleado/'+id)
                    .then( response => {
                        if (response.status == 200) {
                            this.makeToast('Realizado', 'Empleado eliminado', 'success'),
                            this.getEmployees();
                        }
                    })
                    .catch(error => console.log(error.response))
                }
            },

            makeToast(title, text, type) {
                this.toastCount++
                this.$bvToast.toast(text, {
                    title: title,
                    variant: type,
                    autoHideDelay: 3000,
                    appendToast: true
                })
            },
        },
    }

</script>
