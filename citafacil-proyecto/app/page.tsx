'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  HeartPulse,
  Home,
  Menu,
  Search,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'

const specialties = [
  { name: 'Medicina general', icon: Stethoscope, color: 'blue' },
  { name: 'Pediatría', icon: UsersRound, color: 'mint' },
  { name: 'Psicología', icon: HeartPulse, color: 'purple' },
  { name: 'Ginecología', icon: UserRound, color: 'rose' },
  { name: 'Odontología', icon: FileText, color: 'orange' },
  { name: 'Oftalmología', icon: Search, color: 'indigo' },
  { name: 'Traumatología', icon: HeartPulse, color: 'gold' },
  { name: 'Cardiología', icon: HeartPulse, color: 'red' },
]

const doctors = [
  { name: 'Dra. Ana Mendoza', specialty: 'Medicina general', initials: 'AM', rating: '4.9' },
  { name: 'Dr. Luis Cedeño', specialty: 'Medicina general', initials: 'LC', rating: '4.8' },
  { name: 'Dr. Enrique Zambrano', specialty: 'Medicina general', initials: 'EZ', rating: '4.9' },
  { name: 'Dr. Marco Arteaga', specialty: 'Medicina general', initials: 'MA', rating: '4.7' },
]

const times = ['09:00 a. m.', '10:30 a. m.', '12:00 p. m.', '03:00 p. m.']

function Sidebar({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  const links = [
    { label: 'Inicio', icon: Home },
    { label: 'Mis citas', icon: CalendarDays },
    { label: 'Perfil', icon: UserRound },
    { label: 'Ayuda', icon: CircleHelp },
  ]

  return (
    <aside className="sidebar">
      <div className="brand-mark">Cita<span>Fácil</span></div>
      <div className="brand-tag">Tu salud, a un clic</div>
      <nav aria-label="Navegación principal">
        {links.map(({ label, icon: Icon }) => (
          <button key={label} className={`nav-link ${active === label ? 'active' : ''}`} onClick={() => onChange(label)}>
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
            <ArrowRight className="nav-arrow" size={15} />
          </button>
        ))}
      </nav>
      <div className="sidebar-help">
        <div className="help-icon"><CircleHelp size={18} /></div>
        <p>¿Necesitas ayuda?</p>
        <button onClick={() => onChange('Ayuda')}>Contáctanos</button>
      </div>
      <div className="sidebar-footer">© 2026 CitaFácil</div>
    </aside>
  )
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Inicio')
  const [step, setStep] = useState<'home' | 'specialty' | 'doctor' | 'confirm' | 'success'>('home')
  const [selectedSpecialty, setSelectedSpecialty] = useState(specialties[0])
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])
  const [selectedDay, setSelectedDay] = useState(6)
  const [selectedTime, setSelectedTime] = useState(times[0])
  const [showMobileNav, setShowMobileNav] = useState(false)

  const monthDays = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])

  const goHome = () => { setActiveNav('Inicio'); setStep('home') }
  const startBooking = () => { setActiveNav('Inicio'); setStep('specialty') }

  return (
    <main className="app-shell">
      <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setShowMobileNav(!showMobileNav)}><Menu size={22} /></button>
      <div className={showMobileNav ? 'mobile-overlay show' : 'mobile-overlay'} onClick={() => setShowMobileNav(false)} />
      <div className={showMobileNav ? 'sidebar-wrap open' : 'sidebar-wrap'}><Sidebar active={activeNav} onChange={(value) => { setActiveNav(value); setShowMobileNav(false); if (value === 'Inicio') goHome() }} /></div>

      <section className="content-area">
        <header className="topbar">
          <div className="breadcrumb"><span>CitaFácil</span><b>/</b>{step === 'home' ? 'Inicio' : <>Agendar cita <b>/</b> {step === 'specialty' ? 'Especialidad' : step === 'doctor' ? 'Médico y horario' : 'Confirmación'}</>}</div>
          <div className="top-actions"><button className="notification" aria-label="Notificaciones"><Bell size={19} /><i /></button><div className="user-mini"><div className="avatar small">JP</div><span>Juan Pérez</span><ChevronRight size={16} /></div></div>
        </header>

        {activeNav === 'Mis citas' ? (
          <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Tu agenda</p><h1>Mis citas</h1><p className="subtitle">Consulta y administra tus próximas consultas.</p></div><button className="primary-button" onClick={startBooking}><CalendarDays size={17} /> Agendar nueva cita</button></div><div className="appointments-grid"><AppointmentCard title="Medicina general" doctor="Dra. Ana Mendoza" date="Jueves, 5 de noviembre" time="9:00 a. m." color="blue" /><AppointmentCard title="Pediatría" doctor="Dr. Luis Arteaga" date="Martes, 17 de noviembre" time="8:00 p. m." color="mint" /></div></section>
        ) : activeNav === 'Perfil' ? (
          <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Tu información</p><h1>Mi perfil</h1><p className="subtitle">Mantén tus datos actualizados.</p></div></div><div className="profile-card"><div className="avatar large">JP</div><div className="profile-fields"><label>Nombre completo<input value="Juan Pérez" readOnly /></label><label>Correo electrónico<input value="juan.perez@email.com" readOnly /></label><label>Teléfono<input value="+593 99 000 0000" readOnly /></label></div><button className="outline-button">Editar datos</button></div></section>
        ) : activeNav === 'Ayuda' ? (
          <section className="page-section help-page"><p className="eyebrow">Estamos para ayudarte</p><h1>¿Cómo podemos ayudarte?</h1><p className="subtitle">Encuentra respuestas rápidas sobre tus citas y tu cuenta.</p><div className="faq-grid"><div><CircleHelp size={25} /><h3>¿Cómo agendo una cita?</h3><p>Elige una especialidad, selecciona tu médico y confirma un horario disponible.</p></div><div><Clock3 size={25} /><h3>¿Puedo reprogramar?</h3><p>Sí, puedes hacerlo desde la sección Mis citas hasta 24 horas antes.</p></div><div><Bell size={25} /><h3>Recordatorios</h3><p>Te avisaremos antes de cada consulta para que no la olvides.</p></div></div></section>
        ) : step === 'home' ? (
          <section className="home-section"><div className="welcome"><p className="eyebrow">Mi espacio de salud</p><h1>Hola, Juan</h1><p className="subtitle">¿Qué necesitas hacer hoy?</p></div><div className="quick-actions"><button onClick={startBooking}><span className="quick-icon blue-bg"><CalendarDays size={24} /></span><strong>Agendar cita</strong><small>Encuentra tu médico</small></button><button onClick={() => setActiveNav('Mis citas')}><span className="quick-icon mint-bg"><Clock3 size={24} /></span><strong>Mis citas</strong><small>Revisa tu agenda</small></button><button onClick={() => setActiveNav('Perfil')}><span className="quick-icon purple-bg"><UserRound size={24} /></span><strong>Mi perfil</strong><small>Actualiza tus datos</small></button></div><div className="reminders"><div className="section-title"><div><p className="eyebrow">No lo olvides</p><h2>Recordatorios</h2></div><button onClick={() => setActiveNav('Mis citas')}>Ver todas <ArrowRight size={15} /></button></div><div className="reminder-list"><div className="reminder"><div className="reminder-icon"><Bell size={16} /></div><div><b>CitaFácil · Recordatorio</b><strong>Tu cita es en 2 horas</strong><span>Consultorio 3 · Planta baja</span></div><span className="reminder-time">09:00<br />hoy</span></div><div className="reminder"><div className="reminder-icon"><Bell size={16} /></div><div><b>CitaFácil · Recordatorio</b><strong>Mañana tienes cita</strong><span>Medicina general · 9:00 a. m.</span></div><span className="reminder-time">mañana</span></div></div></div></section>
        ) : (
          <section className="booking-section">
            {step === 'specialty' && <><div className="section-heading compact"><div><p className="eyebrow">Paso 1 de 3</p><h1>¿Qué especialidad necesitas?</h1><p className="subtitle">Selecciona el área médica para encontrar el profesional ideal.</p></div><button className="back-link" onClick={goHome}><ChevronLeft size={17} /> Volver al inicio</button></div><div className="specialty-grid">{specialties.map(({ name, icon: Icon, color }) => <button key={name} className="specialty-card" onClick={() => { setSelectedSpecialty({ name, icon: Icon, color }); setStep('doctor') }}><span className={`specialty-icon ${color}`}><Icon size={26} /></span><span>{name}</span><ArrowRight size={16} /></button>)}</div></>}
            {step === 'doctor' && <><div className="section-heading compact"><div><p className="eyebrow">Paso 2 de 3 · {selectedSpecialty.name}</p><h1>Elige tu médico y horario</h1><p className="subtitle">Selecciona un profesional y una hora disponible.</p></div><button className="back-link" onClick={() => setStep('specialty')}><ChevronLeft size={17} /> Cambiar especialidad</button></div><div className="doctor-layout"><div className="doctor-list"><label className="search-box"><Search size={18} /><input placeholder="Buscar médico por nombre" /></label>{doctors.map((doctor) => <button className={`doctor-row ${selectedDoctor.name === doctor.name ? 'selected' : ''}`} key={doctor.name} onClick={() => setSelectedDoctor(doctor)}><div className="avatar">{doctor.initials}</div><div><strong>{doctor.name}</strong><span>{doctor.specialty} · <b>★ {doctor.rating}</b></span></div><Check className="selected-check" size={18} /></button>)}</div><div className="calendar-panel"><div className="calendar-header"><button aria-label="Mes anterior"><ChevronLeft size={18} /></button><strong>Noviembre 2026</strong><button aria-label="Mes siguiente"><ChevronRight size={18} /></button></div><div className="weekdays">{['L','M','M','J','V','S','D'].map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}</div><div className="calendar-grid">{[...Array(6)].map((_, i) => <span key={`empty-${i}`} />)}{monthDays.map((day) => <button key={day} className={`${day === selectedDay ? 'day-selected' : ''} ${[1, 8, 15, 22, 29].includes(day) ? 'has-slots' : ''}`} onClick={() => setSelectedDay(day)}>{day}</button>)}</div><div className="time-heading"><span>Horarios disponibles</span><small>Viernes, {selectedDay} de noviembre</small></div><div className="time-grid">{times.map((time) => <button className={selectedTime === time ? 'time-selected' : ''} key={time} onClick={() => setSelectedTime(time)}><Clock3 size={14} />{time}</button>)}</div><button className="primary-button full" onClick={() => setStep('confirm')}>Continuar <ArrowRight size={17} /></button></div></div></>}
            {step === 'confirm' && <div className="confirmation-wrap"><div className="confirmation-card"><button className="close-button" onClick={() => setStep('doctor')} aria-label="Cerrar"><X size={19} /></button><div className="confirm-symbol"><CalendarDays size={28} /></div><p className="eyebrow">Paso 3 de 3 · Confirmación</p><h1>¿Confirmas tu cita?</h1><p className="subtitle">Revisa los datos antes de confirmar.</p><div className="confirm-summary"><div><span><UserRound size={16} /> Médico</span><strong>{selectedDoctor.name}</strong></div><div><span><CalendarDays size={16} /> Fecha</span><strong>Viernes, {selectedDay} de noviembre de 2026</strong></div><div><span><Clock3 size={16} /> Hora</span><strong>{selectedTime}</strong></div><div><span><Stethoscope size={16} /> Especialidad</span><strong>{selectedSpecialty.name}</strong></div></div><div className="confirm-actions"><button className="outline-button" onClick={() => setStep('doctor')}>Volver</button><button className="primary-button" onClick={() => setStep('success')}><Check size={17} /> Confirmar cita</button></div></div></div>}
            {step === 'success' && <div className="confirmation-wrap"><div className="confirmation-card success-card"><div className="success-symbol"><Check size={32} /></div><p className="eyebrow">Todo listo</p><h1>¡Cita agendada!</h1><p className="subtitle">Hemos guardado tu cita y te enviaremos un recordatorio.</p><div className="success-details"><strong>{selectedSpecialty.name}</strong><span>{selectedDoctor.name}</span><span><CalendarDays size={15} /> Viernes, {selectedDay} de noviembre · {selectedTime}</span></div><button className="primary-button full" onClick={() => { setActiveNav('Mis citas'); setStep('home') }}>Ir a mis citas <ArrowRight size={17} /></button></div></div>}
          </section>
        )}
      </section>
    </main>
  )
}

function AppointmentCard({ title, doctor, date, time, color }: { title: string; doctor: string; date: string; time: string; color: string }) { return <article className={`appointment-card ${color}`}><div className="appointment-top"><span className="specialty-dot"><Stethoscope size={18} /></span><div><strong>{title}</strong><span>{doctor}</span></div><span className="appointment-status">Confirmada</span></div><div className="appointment-info"><span><CalendarDays size={15} /> {date}</span><span><Clock3 size={15} /> {time}</span></div><div className="appointment-actions"><button>Reprogramar</button><button>Cancelar</button></div></article> }
