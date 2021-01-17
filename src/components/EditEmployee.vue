<template>
    <div>
        <!-- Modal para Editar Empleado -->
        <b-modal id="edit-employee" ref="editEmployeeModal" hide-footer title="Editar Empleado" scrollable>
            <div class="d-block">
                <form v-on:submit.prevent="update">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="tipo_id">Tipo ID</label>
                            <input type="text" v-model.trim="$v.editEmployeeData.tipo_id.$model" class="form-control"
                                @blur="$v.editEmployeeData.tipo_id.$touch()"
                                :class="{'is-invalid' : validationStatus($v.editEmployeeData.tipo_id)}" id="tipo_id">
                            <span class="errors" v-if="$v.editEmployeeData.tipo_id.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="nombre">Nombre</label>
                            <input type="text" v-model.trim="$v.editEmployeeData.nombre.$model" class="form-control"
                                @blur="$v.editEmployeeData.nombre.$touch()"
                                :class="{'is-invalid' : validationStatus($v.editEmployeeData.nombre)}" id="nombre">
                            <span class="errors" v-if="$v.editEmployeeData.nombre.$error">{{message}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="apellido">Apellido</label>
                            <input type="text" v-model.trim="$v.editEmployeeData.apellido.$model" class="form-control"
                                @blur="$v.editEmployeeData.apellido.$touch()"
                                :class="{'is-invalid' : validationStatus($v.editEmployeeData.apellido)}" id="apellido">
                            <span class="errors" v-if="$v.editEmployeeData.apellido.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cat">Categoría</label>
                            <input type="text" v-model.trim="$v.editEmployeeData.cat.$model" class="form-control"
                                @blur="$v.editEmployeeData.cat.$touch()"
                                :class="{'is-invalid' : validationStatus($v.editEmployeeData.cat)}" id="cat">
                            <span class="errors" v-if="$v.editEmployeeData.cat.$error">{{message}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="edad">Edad</label>
                            <input type="text" v-model.trim="$v.editEmployeeData.edad.$model" class="form-control"
                                @blur="$v.editEmployeeData.edad.$touch()"
                                :class="{'is-invalid' : validationStatus($v.editEmployeeData.edad)}" id="edad">
                            <span class="errors" v-if="$v.editEmployeeData.edad.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label>Cargo</label>
                            <b-form-select v-model="editEmployeeData.cargo" :options="cargos" class="mb-3">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione --
                                    </b-form-select-option>
                                </template>
                            </b-form-select>
                        </div>
                    </div>

                    <hr>

                    <div class="text-right">
                        <button type="button" class="btn btn-danger" @click="hideEditEmployeeModal">Cancelar</button>
                        <button :disabled="$v.editEmployeeData.$invalid" type="submit" class="btn btn-primary"><span
                                class="fa fa-check"></span> Actualizar</button>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>

    //Validación formulario
    import { required } from 'vuelidate/lib/validators';

    export default {
        props: {
            editEmployeeData: Object
        },

        data() {
            return {
                message: 'Dato requerido',
                cargos: ['Administrador', 'Gerente', 'Coordinador', 'Analista', 'Asesor'],
                employee: {}
            }
        },

        validations: {
            editEmployeeData: {
                tipo_id: { required },
                nombre: { required },
                apellido: { required },
                cat: { required },
                edad: { required },
                cargo: { required },
            },
        },

        methods: {

            validationStatus(validation) {
                return typeof validation != "undefined" ? validation.$error : false;
            },

            update() {
                this.employee = this.editEmployeeData;

                let formData = new FormData();
                formData.append('tipo_id', this.employee.tipo_id);
                formData.append('nombre', this.employee.nombre);
                formData.append('apellido', this.employee.apellido);
                formData.append('cat', this.employee.cat);
                formData.append('edad', this.employee.edad);
                formData.append('cargo', this.employee.cargo);
                formData.append("_method", "put");

                let url = 'https://app-giving.herokuapp.com/api/empleado/' + this.employee.id;
                this.axios
                    .post(url, formData)
                    .then(response => {
                        if (response.status == 200) {
                            this.hideEditEmployeeModal();
                            this.$emit("getEmployees");
                            setTimeout(() => {
                                this.makeToast('Actualizado', 'Registro actualizado', 'info');
                            }, 2000);
                        }
                    })
                    .catch(error => {
                        console.log(error.response),
                        this. makeToast('Advertencia', 'Error al guardar registro', 'warning');
                    })
            },

            hideEditEmployeeModal() {
                this.$v.$reset();
                this.$emit("getEmployees");
                this.$refs.editEmployeeModal.hide();
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
