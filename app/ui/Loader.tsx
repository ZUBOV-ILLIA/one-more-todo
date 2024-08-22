export default function Loader({ size = 24, color = '#fff', className = '' }) {
    return (
      <svg
        className={`animate-spin ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        
        // fill="#2E2434"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M7.70312 1.85938C9.03516 1.28646 10.4674 1 12 1C13.5182 1 14.9434 1.28646 16.2754 1.85938C17.6074 2.43229 18.7712 3.21647 19.7666 4.21191C20.3121 4.75741 20.7952 5.35344 21.216 6H19.5088C19.2845 5.72023 19.0446 5.45363 18.7891 5.2002C17.9154 4.33365 16.8949 3.64616 15.7275 3.1377C14.5602 2.62923 13.3177 2.375 12 2.375C10.6823 2.375 9.4362 2.62923 8.26172 3.1377C7.08723 3.64616 6.06674 4.33724 5.2002 5.21094C4.33365 6.08464 3.64616 7.10514 3.1377 8.27246C2.62923 9.43978 2.375 10.6823 2.375 12C2.375 13.3177 2.62923 14.5602 3.1377 15.7275C3.64616 16.8949 4.33724 17.9154 5.21094 18.7891C6.08464 19.6628 7.10514 20.3538 8.27246 20.8623C8.83109 21.1056 9.40693 21.2907 10 21.4176V22.8278C9.2013 22.6861 8.4321 22.4571 7.69238 22.1406C6.35318 21.5677 5.18946 20.7835 4.20117 19.7881C3.21289 18.7926 2.43229 17.6289 1.85938 16.2969C1.28646 14.9648 1 13.5326 1 12C1 10.4674 1.28646 9.03158 1.85938 7.69238C2.43229 6.35318 3.21647 5.18946 4.21191 4.20117C5.20736 3.21289 6.37109 2.43229 7.70312 1.85938Z" fill={color} />
      </svg>
    );
}