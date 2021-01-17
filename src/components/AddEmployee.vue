<template>
    <div>
        <!-- Modal para Agregar Empleados -->
        <b-modal id="modal-1" ref="employeeModal" hide-footer title="Agregar Empleado" scrollable>
            <div class="d-block">
                <form v-on:submit.prevent="save">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="tipo_id">Tipo ID</label>
                            <input type="text" v-model.trim="$v.employeeData.tipo_id.$model" class="form-control"
                                 @blur="$v.employeeData.tipo_id.$touch()"
                                 :class="{'is-invalid' : validationStatus($v.employeeData.tipo_id)}"
                                 id="tipo_id" placeholder="Escriba el tipo id">
                            <span class="errors" v-if="$v.employeeData.tipo_id.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="id">ID</label>
                            <input type="text" v-model.trim="$v.employeeData.id.$model" class="form-control"
                                @blur="$v.employeeData.id.$touch()"
                                :class="{'is-invalid' : validationStatus($v.employeeData.id)}"
                                id="id" placeholder="Escriba el id">
                            <span class="errors" v-if="$v.employeeData.id.$error">{{message}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="nombre">Nombre</label>
                            <input type="text" v-model.trim="$v.employeeData.nombre.$model" class="form-control"
                                @blur="$v.employeeData.nombre.$touch()"
                                :class="{'is-invalid' : validationStatus($v.employeeData.nombre)}"
                                id="nombre" placeholder="Escriba el nombre">
                            <span class="errors" v-if="$v.employeeData.nombre.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="apellido">Apellido</label>
                            <input type="text" v-model.trim="$v.employeeData.apellido.$model" class="form-control"
                                @blur="$v.employeeData.apellido.$touch()"
                                :class="{'is-invalid' : validationStatus($v.employeeData.apellido)}"
                                id="apellido" placeholder="Escriba el apellido">
                            <span class="errors" v-if="$v.employeeData.apellido.$error">{{message}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="cat">Categoría</label>
                            <input type="text" v-model.trim="$v.employeeData.cat.$model" class="form-control"
                                @blur="$v.employeeData.cat.$touch()"
                                :class="{'is-invalid' : validationStatus($v.employeeData.cat)}"
                                id="cat" placeholder="Categoría">
                             <span class="errors" v-if="$v.employeeData.cat.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="edad">Edad</label>
                            <input type="text" v-model.trim="$v.employeeData.edad.$model" class="form-control"
                                @blur="$v.employeeData.edad.$touch()"
                                :class="{'is-invalid' : validationStatus($v.employeeData.edad)}"
                                id="edad" placeholder="Escriba la edad">
                            <span class="errors" v-if="$v.employeeData.edad.$error">{{message}}</span>
                        </div>
                        <div class="form-group col-md-4">
                            <label>Cargo</label>
                            <b-form-select v-model="employeeData.cargo" :options="cargos" class="mb-3">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione --
                                    </b-form-select-option>
                                </template>
                            </b-form-select>
                        </div>
                    </div>

                    <hr>

                    <div class="text-right">
                        <button type="button" class="btn btn-danger" @click="hideEmployeeModal">Cancelar</button>
                        <button :disabled="$v.employeeData.$invalid" type="submit" class="btn btn-primary"><span class="fa fa-check"></span> Guardar</button>
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

        name: 'AddEmployee',

        data() {

            return {
                message: 'Dato requerido',
                cargos: ['Administrador', 'Gerente', 'Coordinador', 'Analista', 'Asesor'],
                employeeData: {
                    tipo_id: '',
                    id: '',
                    nombre: '',
                    apellido: '',
                    cat: '',
                    edad: '',
                    cargo: null
                },
            }
        },

        validations: {
            employeeData: {
                tipo_id: { required },
                id: { required },
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

            save() {

                this.$v.$touch();

                if (this.$v.$pendding || this.$v.$error) {
                    return;
                }

                let url = 'https://app-giving.herokuapp.com/api/empleado';
                this.axios
                    .post(url, this.employeeData)
                    .then( response => {
                        if (response.status == 200) {
                            this.hideEmployeeModal();
                            this.$emit("getEmployees");
                            this.cleanForm();
                            setTimeout(() => {
                                this.makeToast('Realizado', 'Registro completado', 'success');
                            }, 2000);
                        }
                    })
                    .catch(error => {
                        console.log(error.response),
                        this. makeToast('Advertencia', 'Error al guardar registro', 'warning');
                    })
            },

            hideEmployeeModal() {
                this.$v.$reset();
                this.$refs.employeeModal.hide();
                this.cleanForm();
            },

            cleanForm() {
                this.employeeData = {
                    tipo_id: '',
                    id: '',
                    nombre: '',
                    apellido: '',
                    cat: '',
                    edad: '',
                    cargo: null
                };
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
        }
    }

</script>

<style>
    .errors {
        color: red;
        font-size: 14px;
    }
</style>
