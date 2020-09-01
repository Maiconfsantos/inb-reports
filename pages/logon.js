import React, { useState } from 'react'
import { Link } from 'next/link'

import { TextInput, PasswordInput } from '../components/input'

import containerStyle from '../components/container.module.css'
import sectionStyle from '../components/section.module.css'
import logonStyle from '../components/logon.module.css'



export default function logon(){

    return (
        <div className={containerStyle.body}>
            <section className={sectionStyle.logonBox}>
                <div className={logonStyle.inputMargin}>
                    <TextInput placeholder='Usuário'/>
                </div>

                <div className={logonStyle.inputMargin}>
                    <PasswordInput placeholder='Senha'/>
                </div>
            </section>
        </div>
    )
}
