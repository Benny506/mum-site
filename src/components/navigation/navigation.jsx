import { Link } from "react-router-dom";
import logoAndName from "../../assets/images/logoAndName.png";
import { motion } from "framer-motion";

function Navigation() {
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <motion.div
      className="fixed-top d-flex align-items-center justify-content-center py-3 px-4 px-md-5"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="d-flex justify-content-between align-items-center col-12">
        <motion.img
          src={logoAndName}
          alt="Logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{ height: "40px", objectFit: "contain" }}
        />
        
        <Link to="/download" style={{ textDecoration: "none" }}>
          <motion.button
            className="d-flex align-items-center"
            style={{
              backgroundColor: "#FA0808",
              borderRadius: "40px",
              padding: "10px 18px",
              color: "white",
              border: "none",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="mb-0 btn-text">Download</p>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Navigation;