import {FaWhatsapp} from 'react-icons/fa'

export default function WhatsappChat(){
    const phone = "6282233064087"
    const message = "Hi, I saw your portfolio."
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    return(
        <a
            href={url}
            target='_blank'
            rel="noopener noreferrer"
            className='fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600'
        >
            <FaWhatsapp size={24}/>
        </a>
    )
}